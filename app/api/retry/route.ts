import { NextRequest, NextResponse } from "next/server";
import type { RetryRequest, RetryResponse } from "@/types/api";

/**
 * モックAPI: もっと盛る（再生成）エンドポイント
 * POST /api/retry
 */
export async function POST(request: NextRequest) {
  try {
    const body: RetryRequest = await request.json();
    
    // バリデーション
    if (!body.previous_context) {
      return NextResponse.json(
        { error: "previous_contextは必須です" },
        { status: 400 }
      );
    }
    
    if (!body.previous_excuse) {
      return NextResponse.json(
        { error: "previous_excuseは必須です" },
        { status: 400 }
      );
    }

    if (!body.retry_instruction) {
      return NextResponse.json(
        { error: "retry_instructionは必須です" },
        { status: 400 }
      );
    }

    // モックとして2秒待機（API呼び出しをシミュレート）
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { target, symptoms, situation, level, nuance } = body.previous_context;
    // const instruction = body.retry_instruction; // モックでは使わない

    // retry_instructionに応じたバリエーション
    const excuseTemplates = [
      `${target}へ\n\n${situation}において、私の身に花粉症という避けがたい試練が訪れました。${symptoms}という症状に見舞われ、まるで春の嵐に翻弄される桜の花びらのように、私の集中力は静かに、しかし確実に散りゆいていったのです。視界は霞み、思考は断続的に中断され、自らの意思とは無関係に身体が反乱を起こす始末でした。\n\nこの春の呪いとも言うべき花粉症レベル${level}の猛威の前では、いかなる英雄であろうと膝を屈するほかありません。抗う術を講じたものの、その効果は限定的であり、万全とは程遠い状態であったことを深くお詫び申し上げます。何卒、この季節特有の不可抗力としてご理解とご慈悲を賜りたく存じます。`,

      `大切な${situation}に臨むはずだった私の意識は、春という季節の魔力に静かに、しかし確実に支配されておりました。${symptoms}が断続的に私の理性を蝕み、集中の糸を何度も断ち切り、花粉症レベル${level}という未曾有の災厄が、結果として私の本来の力を封じ込めてしまったのです。\n\n本意では決してありません。十分な準備を整え、最善を尽くす覚悟で臨んだにもかかわらず、身体的制約により理想通りの成果を示すことができませんでした。${target}におかれましては、この春の魔物の恐ろしさをご賢察いただき、寛大なお心でお受け止めいただけますと幸いです。`,

      `申し訳ございません、${target}。${situation}という重要かつ責任ある局面において、花粉という目に見えぬ敵が私を急襲いたしました。${symptoms}に加え、断続的な体調不良が重なり、花粉症レベル${level}という深刻な状況下では、思考力・集中力ともに著しく制限されておりました。\n\n決して軽視していたわけではなく、可能な限りの対策を講じた上で臨んだものの、自然の猛威は予想以上でした。この春の試練を確実に乗り越えるべく、今後はより一層の対策を施し、万全の状態で責務を果たせるよう努める所存です。どうか事情をご賢察のうえ、ご理解いただけますと幸いです。`
    ];

    const excuse = excuseTemplates[Math.floor(Math.random() * excuseTemplates.length)];
    
    // 再生成ではスコアが少し上がる傾向（70-98の範囲）
    const score = Math.floor(Math.random() * 29) + 70;

    // レスポンスを生成
    const response: RetryResponse = {
      excuse: excuse,
      score: score,
      id: `retry-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      used_inputs: body.previous_context,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
