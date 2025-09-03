import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'WorkPayTools';
    const subtitle = searchParams.get('subtitle') || 'Free payroll calculators, HR templates, and guides';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1e293b',
                letterSpacing: '-0.02em',
              }}
            >
              WorkPayTools
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '800px',
              padding: '0 40px',
              textAlign: 'center',
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: '800',
                color: '#0f172a',
                lineHeight: '1.1',
                marginBottom: '20px',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: '24px',
                fontWeight: '400',
                color: '#64748b',
                lineHeight: '1.4',
                maxWidth: '600px',
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              fontSize: '18px',
              fontWeight: '500',
              color: '#64748b',
            }}
          >
            workpaytools.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
