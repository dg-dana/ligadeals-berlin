import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

// Sanity webhook signature validation
function isValidSignature(
  body: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false;

  const hash = createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return `sha256=${hash}` === signature;
}

// Parse Sanity webhook payload
interface SanityWebhookPayload {
  _id: string;
  _type: string;
  _rev: string;
  slug?: {
    current: string;
  };
}

// Map document types to paths that need revalidation
function getPathsToRevalidate(payload: SanityWebhookPayload): string[] {
  const paths: string[] = [];

  switch (payload._type) {
    case 'article':
      // Revalidate homepage (featured articles)
      paths.push('/');
      // Revalidate blog listing
      paths.push('/blog');
      // Revalidate specific article if slug exists
      if (payload.slug?.current) {
        paths.push(`/blog/${payload.slug.current}`);
      }
      break;

    case 'category':
      // Revalidate all category-related pages
      paths.push('/blog');
      if (payload.slug?.current) {
        paths.push(`/blog/category/${payload.slug.current}`);
      }
      break;

    case 'photo':
      // Revalidate gallery pages
      paths.push('/gallery');
      paths.push('/gallery/photos');
      break;

    case 'video':
      // Revalidate gallery pages
      paths.push('/gallery');
      paths.push('/gallery/videos');
      break;

    case 'testimonial':
      // Revalidate homepage and about page
      paths.push('/');
      paths.push('/about');
      break;

    case 'siteSettings':
      // Revalidate all pages when site settings change
      paths.push('/');
      break;

    default:
      // For unknown types, just revalidate homepage
      paths.push('/');
  }

  return paths;
}

// Map document types to cache tags
function getTagsToRevalidate(payload: SanityWebhookPayload): string[] {
  const tags: string[] = [];

  switch (payload._type) {
    case 'article':
      tags.push('articles');
      if (payload._id) {
        tags.push(`article-${payload._id}`);
      }
      break;

    case 'category':
      tags.push('categories');
      if (payload._id) {
        tags.push(`category-${payload._id}`);
      }
      break;

    case 'photo':
      tags.push('photos');
      break;

    case 'video':
      tags.push('videos');
      break;

    case 'testimonial':
      tags.push('testimonials');
      break;

    case 'siteSettings':
      tags.push('site-settings');
      break;
  }

  return tags;
}

export async function POST(request: NextRequest) {
  try {
    // Check for webhook secret
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('SANITY_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Get request body as text for signature validation
    const bodyText = await request.text();

    // Validate webhook signature
    const signature = request.headers.get('sanity-webhook-signature');

    if (!isValidSignature(bodyText, signature, webhookSecret)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the body
    const payload: SanityWebhookPayload = JSON.parse(bodyText);

    // Log the webhook event
    console.log('Received Sanity webhook:', {
      type: payload._type,
      id: payload._id,
      slug: payload.slug?.current,
    });

    // Get paths and tags to revalidate
    const paths = getPathsToRevalidate(payload);
    const tags = getTagsToRevalidate(payload);

    // Revalidate paths
    const revalidatedPaths: string[] = [];
    for (const path of paths) {
      try {
        revalidatePath(path);
        revalidatedPaths.push(path);
        console.log(`Revalidated path: ${path}`);
      } catch (error) {
        console.error(`Failed to revalidate path ${path}:`, error);
      }
    }

    // Revalidate tags
    const revalidatedTags: string[] = [];
    for (const tag of tags) {
      try {
        revalidateTag(tag);
        revalidatedTags.push(tag);
        console.log(`Revalidated tag: ${tag}`);
      } catch (error) {
        console.error(`Failed to revalidate tag ${tag}:`, error);
      }
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Revalidation triggered',
        revalidated: {
          paths: revalidatedPaths,
          tags: revalidatedTags,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Revalidation webhook error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Handle GET for webhook testing (in development only)
export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    );
  }

  return NextResponse.json(
    {
      message: 'Revalidation webhook endpoint is working',
      info: 'Send POST requests with Sanity webhook payload to trigger revalidation',
      environment: process.env.NODE_ENV,
    },
    { status: 200 }
  );
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, sanity-webhook-signature',
      },
    }
  );
}
