import getScoreEmoji from '@/app/utils/ScoreEmoji';
import fetchApi from '@/hooks/utils/APIUtil';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('id') || null;
  let excuse = searchParams.get('text') || '何も生成されていないようです...';
  let score = parseInt(searchParams.get('score') || '-1');
    
  if (id) {
    const response = await fetchApi("get-excuse/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      excuse = data.excuse || excuse;
      score = data.score || score;
    }
  }

  const progress = (score / 100) * 360;

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (progress / 360) * circumference;

  const excuseLength = excuse.length;

  const excuseFontSize =
    excuseLength > 350 ? 24 :
    excuseLength > 300 ? 26 :
    excuseLength > 270 ? 28 :
    excuseLength > 240 ? 30 :
    excuseLength > 220 ? 32 :
    excuseLength > 180 ? 34 : 36;

  const displayExcuse =
  excuseLength > 420 ? excuse.slice(0, 420) + "..." : excuse;
  
  try {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'transparent', 
          padding: '40px', fontFamily: 'system-ui, sans-serif' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'white', border: '4px solid #1e2939', 
            borderRadius: '32px', padding: '32px 40px', margin: '8px' }}
          >
            <div style={{ flex: 1, fontSize: excuseFontSize, color: '#374151', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start' }}>
              {displayExcuse}
            </div>

            <hr style={{ border: 'none', borderTop: '3px dashed #666', margin: '12px 0' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 64, display: 'flex' }}>
                {getScoreEmoji(score)}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                <div style={{ fontSize: 30, fontWeight: 'bold', color: '#6b7280', letterSpacing: '0.05em', display: 'flex' }} >
                  説得力スコア
                </div>

                <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
                  </svg>
                  <div style={{ width: '90px', height: '90px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    <div style={{ fontSize: 36, fontWeight: 900, color: '#4b5563', display: 'flex' }}>
                      {score}
                    </div>
                  </div>

                  <div style={{ position: 'absolute', right: "-30px", bottom: '-30px', fontSize: 16, fontWeight: 'bold', color: '#6b7280', display: 'flex' }} >
                    花粉症・限界突破エクスキューズジェネレーター
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 675,
      }
    );
  } catch (error) {
    console.error('OGP画像生成エラー:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}