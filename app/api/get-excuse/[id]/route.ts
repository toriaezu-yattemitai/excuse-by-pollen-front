import { NextRequest, NextResponse } from "next/server";
import type { GenerateResponse } from "@/types/api";

/**
 * モックAPI: データを取得する
 * GET /api/get-excuse/<id>
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // モックとして2秒待機（API呼び出しをシミュレート）
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const id = (await params).id;

  if (!id) {
    return NextResponse.json(
      { error: "idパラメータが必要です" },
      { status: 400 }
    );
  }

  // AIが補完する設定（nullの場合はランダムに生成）
  const symptoms = ["鼻水が止まらない", "目がかゆい", "くしゃみが止まらない", "頭がぼーっとする"];
  const levels = [1, 2, 3, 4, 5];
  const targets = ["勇者パーティ", "上司", "先生", "魔王軍", "お客様"];
  const situations = ["魔王討伐前", "会議前", "授業中", "納品前", "プレゼン中"];
  const nuances = ["ファンタジー風", "ビジネスライク", "ポエム風", "深刻", "ユーモア"];
  
  const symptom = symptoms[Math.floor(Math.random() * symptoms.length)];
  const level = levels[Math.floor(Math.random() * levels.length)];
  const target = targets[Math.floor(Math.random() * targets.length)];
  const situation = situations[Math.floor(Math.random() * situations.length)];
  const nuance = nuances[Math.floor(Math.random() * nuances.length)];

  // ダミーの言い訳テキストを生成
  const excuseTemplates = [
    `${target}へ\n\n${situation}において、私の身に花粉症という試練が訪れました。${symptom}という症状に見舞われ、まるで春の嵐に翻弄される桜の花びらのように、私の集中力は無残にも散りゆくのです。\n\nこの春の呪いとも言える花粉症レベル${level}の猛威の前では、いかなる英雄も膝を屈するでしょう。何卒、ご理解とご慈悲を賜りたく存じます。`,
    
    `大切な${situation}に、私の意識は春の魔力に支配されました。${symptom}が私の理性を蝕み、花粉症レベル${level}という未曾有の災厄が、私を無力化させたのです。\n\n${target}におかれましては、この春の魔物の恐ろしさをご理解いただき、温かい目で見守っていただけますと幸いです。`,
    
    `申し訳ございません、${target}。${situation}という重要な局面において、花粉という見えない敵が私を襲いました。${symptom}に加え、花粉症レベル${level}という深刻な状況下では、最善を尽くすことが困難でした。\n\nこの春の試練を乗り越えるべく、対策を講じる所存です。`,
  ];

  const excuse = excuseTemplates[Math.floor(Math.random() * excuseTemplates.length)];

  // スコアをランダムに生成（60-95の範囲）
  const score = Math.floor(Math.random() * 36) + 60;

  try {
    // レスポンスを生成
    const response: GenerateResponse = {
      excuse: excuse,
      score: score,
      id: id,
      used_inputs: {
        target: target,
        symptoms: [symptom],
        situation: situation,
        level: level,
        nuance: nuance,
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
