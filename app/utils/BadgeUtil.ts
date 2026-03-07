// 特定のバッジは変更する (現在はpollen-indexのみ)
export default function convertBadges(_badges: Record<string, string>): Record<string, string> {
    let badges = { ..._badges };

    if (badges.hasOwnProperty("pollen-index")) {
        badges["pollen-index"] = `花粉指数: ${badges["pollen-index"]}`;
    }

    if (badges.hasOwnProperty("location")) {
        badges["location"] = `現在位置: ${badges["location"]}`;
    }

    if (badges.hasOwnProperty("pollen-species")) {
        badges["pollen-species"] = `種類: ${badges["pollen-species"]}`;
    }

    return badges;
}
