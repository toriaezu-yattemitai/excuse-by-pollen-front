// スコアに基づいて絵文字をつくる (それぞれの絵文字はとりあえず仮)
export default function getScoreEmoji(score: number): string {
  if (score >= 90) return "🌟";
  if (score >= 75) return "✨";
  if (score >= 60) return "👍";
  if (score >= 40) return "😅";
  return "💧";
}
