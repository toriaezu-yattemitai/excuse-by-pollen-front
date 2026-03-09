import { NextRequest, NextResponse } from "next/server";
import type { GenerateRequest, GenerateResponse } from "@/types/api";

/**
 * モックAPI: 言い訳生成エンドポイント
 * POST /api/generate
 */
export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    
    // バリデーション
    if (!body.inputs.symptoms || body.inputs.symptoms.length === 0) {
      return NextResponse.json(
        { error: "症状は必須です" },
        { status: 400 }
      );
    }
    
    if (!body.inputs.level || body.inputs.level < 1 || body.inputs.level > 5) {
      return NextResponse.json(
        { error: "レベルは1-5の範囲で指定してください" },
        { status: 400 }
      );
    }

    // モックとして2秒待機（API呼び出しをシミュレート）
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // AIが補完する設定（nullの場合はランダムに生成）
    const targets = ["勇者パーティ", "上司", "先生", "魔王軍", "お客様"];
    const situations = ["魔王討伐前", "会議前", "授業中", "納品前", "プレゼン中"];
    const nuances = ["ファンタジー風", "ビジネスライク", "ポエム風", "深刻", "ユーモア"];
    
    const usedTarget = body.inputs.target || targets[Math.floor(Math.random() * targets.length)];
    const usedSituation = body.inputs.situation || situations[Math.floor(Math.random() * situations.length)];
    const usedNuance = body.inputs.nuance || nuances[Math.floor(Math.random() * nuances.length)];

    // ダミーの言い訳テキストを生成
    const excuseTemplates = [
      `${usedTarget}へ\n\n${usedSituation}において、私の身に花粉症という試練が訪れました。${body.inputs.symptoms[0]}という症状に見舞われ、まるで春の嵐に翻弄される桜の花びらのように、私の集中力は無残にも散りゆくのです。\n\nこの春の呪いとも言える花粉症レベル${body.inputs.level}の猛威の前では、いかなる英雄も膝を屈するでしょう。何卒、ご理解とご慈悲を賜りたく存じます。`,
      
      `大切な${usedSituation}に、私の意識は春の魔力に支配されました。${body.inputs.symptoms[0]}が私の理性を蝕み、花粉症レベル${body.inputs.level}という未曾有の災厄が、私を無力化させたのです。\n\n${usedTarget}におかれましては、この春の魔物の恐ろしさをご理解いただき、温かい目で見守っていただけますと幸いです。`,
      
      `申し訳ございません、${usedTarget}。${usedSituation}という重要な局面において、花粉という見えない敵が私を襲いました。${body.inputs.symptoms[0]}に加え、花粉症レベル${body.inputs.level}という深刻な状況下では、最善を尽くすことが困難でした。\n\nこの春の試練を乗り越えるべく、対策を講じる所存です。`,
    ];

    const excuse = excuseTemplates[Math.floor(Math.random() * excuseTemplates.length)];
    
    // スコアをランダムに生成（60-95の範囲）
    const score = Math.floor(Math.random() * 36) + 60;

    // レスポンスを生成
    const response: GenerateResponse = {
      excuse: excuse,
      score: score,
      id: `mock-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      used_inputs: {
        target: usedTarget,
        symptoms: body.inputs.symptoms,
        situation: usedSituation,
        level: body.inputs.level,
        nuance: usedNuance,
      },
      options: {
        badges: {
          "location": "東京都千代田区",
          "pollen_index": "4",
          "pollen_species": "スギ",
        },
      },
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
