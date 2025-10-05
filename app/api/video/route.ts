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

    // Get range header from client request
    const rangeHeader = request.headers.get('range');

    // Prepare headers for Sanity request
    const fetchHeaders: HeadersInit = {
      'Accept': 'video/mp4,video/quicktime,video/*',
    };

    // Forward range request to Sanity if present
    if (rangeHeader) {
      fetchHeaders['Range'] = rangeHeader;
    }

    // Fetch the video from Sanity
    const videoResponse = await fetch(videoUrl, {
      headers: fetchHeaders,
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
    const contentLength = videoResponse.headers.get('content-length');
    const contentRange = videoResponse.headers.get('content-range');

    // Determine correct MIME type for .mov files
    let mimeType = contentType;
    if (videoUrl.toLowerCase().endsWith('.mov')) {
      mimeType = 'video/quicktime';
    } else if (videoUrl.toLowerCase().endsWith('.mp4')) {
      mimeType = 'video/mp4';
    } else if (videoUrl.toLowerCase().endsWith('.webm')) {
      mimeType = 'video/webm';
    }

    // Build response headers
    const responseHeaders: HeadersInit = {
      'Content-Type': mimeType,
      'Content-Disposition': 'inline', // Critical: Force inline playback instead of download
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Access-Control-Allow-Origin': '*',
    };

    // Add content length if available
    if (contentLength) {
      responseHeaders['Content-Length'] = contentLength;
    }

    // Handle range requests (206 Partial Content)
    if (contentRange) {
      responseHeaders['Content-Range'] = contentRange;
      return new NextResponse(videoBuffer, {
        status: 206,
        headers: responseHeaders,
      });
    }

    // Return full video (200 OK)
    return new NextResponse(videoBuffer, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Video proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
