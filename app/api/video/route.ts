import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const videoUrl = searchParams.get('url');

    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Video URL is required' },
        { status: 400 }
      );
    }

    // Validate that the URL is from Sanity CDN
    if (!videoUrl.includes('cdn.sanity.io')) {
      return NextResponse.json(
        { error: 'Invalid video source' },
        { status: 403 }
      );
    }

    // Fetch the video from Sanity
    const videoResponse = await fetch(videoUrl, {
      headers: {
        'Accept': 'video/mp4,video/*',
      },
    });

    if (!videoResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch video' },
        { status: videoResponse.status }
      );
    }

    // Get the video content
    const videoBuffer = await videoResponse.arrayBuffer();
    const contentType = videoResponse.headers.get('content-type') || 'video/mp4';

    // Return video with proper headers for inline playback
    return new NextResponse(videoBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline', // Critical: Force inline playback instead of download
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Cross-Origin-Resource-Policy': 'cross-origin',
      },
    });
  } catch (error) {
    console.error('Video proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
