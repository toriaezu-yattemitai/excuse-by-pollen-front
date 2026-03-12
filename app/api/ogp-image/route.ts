import fetchApi from '@/hooks/utils/APIUtil';
import { NextRequest } from 'next/server';
import { OGPGenerator } from './OGPGenerator';

export const runtime = 'edge';

const generator = new OGPGenerator(); // OGPGenerator、レンダラーのインスタンス

/**
 * OGP画像作成API
 * GET /api/ogp-image/?text=<excuse>&score=<score>
 * GET /api/ogp-image/?id=<excuse_id>
 * どちらのパターンでも、idがあれば優先的にidからデータを取得して画像を生成する
 */
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);

	const id = searchParams.get('id') || null;
	let excuse = searchParams.get('text') || '何も生成されていないようです...';
	let score = parseInt(searchParams.get('score') || '-1');
	 
	// idパラメが存在する場合はAPIからデータを取得
	if (id) {
		try {
			const response = await fetchApi("get-excuse/" + id, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (response.ok) {
				const data = await response.json();
				excuse = data.excuse || excuse;
				score = data.score || score;
			}
		} catch (e) {
			if (e instanceof SyntaxError) {
				console.error('OGP画像生成エラー: Invalid JSON response');
			} else if (e instanceof Error) {
				console.error('OGP画像生成エラー:', e.message);
			} else {
				console.error('OGP画像生成エラー:', e);
			}
		}
	}

	return await generator.handle(excuse, score);
}