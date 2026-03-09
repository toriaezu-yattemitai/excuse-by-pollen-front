// 特定のバッジは変更する (現在はpollen_indexのみ)
export default function convertBadges(_badges: Record<string, string>): Record<string, string> {
    let badges = { ..._badges };

    // -を_に修正
    if (badges.hasOwnProperty("pollen-index")) {
        badges["pollen_index"] = badges["pollen-index"];
        delete badges["pollen-index"];
    }

    if (badges.hasOwnProperty("pollen-species")) {
        badges["pollen_species"] = badges["pollen-species"];
        delete badges["pollen-species"];
    }
    // ----
    
    if (badges.hasOwnProperty("pollen_index")) {
        if (badges["pollen_index"] === "unknown") {
            delete badges["pollen_index"];
        } else {
            badges["pollen_index"] = `花粉指数: ${badges["pollen_index"]}`;
        }
    }

    if (badges.hasOwnProperty("pollen_species")) {
        if (badges["pollen_species"] === "unknown") {
            delete badges["pollen_species"];
        } else {
            badges["pollen_species"] = `種類: ${badges["pollen_species"]}`;
        }
    }

    if (badges.hasOwnProperty("location")) {
        if (badges["location"] === "unknown") {
            delete badges["location"];
        } else {
            badges["location"] = `現在位置: ${badges["location"]}`;
        }
    }

    return badges;
}
