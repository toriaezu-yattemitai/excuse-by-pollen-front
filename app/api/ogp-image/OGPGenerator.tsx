import getScoreEmoji from '@/app/utils/ScoreEmoji';
import { ImageResponse } from '@vercel/og';
import { JSX } from 'react';

export class OGPGenerator {

	/**
	 * OGP画像を生成するハンドラー
	 * @param excuse 描画する言い訳テキスト
	 * @param score 説得力スコア（0-100）
	 * @returns 描画されたOGP画像のレスポンス
	 */
	public async handle(excuse: string, score: number): Promise<ImageResponse> {
		const progress = (score / 100) * 360;
		const circumference = 2 * Math.PI * 54; // 半径54の円の周囲長
		const strokeDashoffset = circumference - (progress / 360) * circumference; // スコアに応じた円の塗りつぶし量を計算

		const len = excuse.length;

		const displayExcuse = len > 420 ? excuse.slice(0, 420) + "..." : excuse;
		const element = this.render(displayExcuse, score, this.getFontSize(len), circumference, strokeDashoffset);
		
		try {
			return new ImageResponse(element, { width: 1200, height: 675 });
		} catch (error) {
    		console.error('OGP画像生成エラー:', error);
    		return new Response('Failed to generate image', { status: 500 });
		}
	}

	/**
	 * 言い訳の長さに応じてフォントサイズを調整する
	 * 長い言い訳はフォントサイズを小さくして、OGP画像内に収まるようにする
	 * @param excuseLength 言い訳の文字数
	 * @returns フォントサイズ
	 */
	protected getFontSize(excuseLength: number): number {
		if (excuseLength > 350) return 24;
		if (excuseLength > 300) return 26;
		if (excuseLength > 270) return 28;
		if (excuseLength > 240) return 30;
		if (excuseLength > 200) return 32;
		if (excuseLength > 160) return 34;
		return 36;
	}

	/**
	 * OGP画像をレンダリングする
	 * @param displayExcuse OGP画像に表示する言い訳テキスト
	 * @param score 説得力スコア
	 * @param excuseFontSize 言い訳テキストのフォントサイズ
	 * @param circumference 円グラフの周囲長
	 * @param strokeDashoffset 円グラフの塗りつぶし量
	 * @returns OGP画像のJSX要素
	 */
	protected render(displayExcuse: string, score: number, excuseFontSize: number, circumference: number, strokeDashoffset: number): JSX.Element {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'transparent', padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
				<div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'white', border: '4px solid #1e2939', borderRadius: '32px', padding: '32px 40px', margin: '8px' }}>
					<div style={{ flex: 1, fontSize: excuseFontSize, color: '#374151', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start' }}>
						{displayExcuse}
					</div>
					<hr style={{ border: 'none', borderTop: '3px dashed #666', margin: '12px 0' }} />
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<div style={{ fontSize: 64, display: 'flex' }}>{getScoreEmoji(score)}</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
							<div style={{ fontSize: 30, fontWeight: 'bold', color: '#6b7280', letterSpacing: '0.05em', display: 'flex' }}>
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
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}