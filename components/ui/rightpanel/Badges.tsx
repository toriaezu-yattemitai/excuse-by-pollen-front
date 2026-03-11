import Badge from "../common/Badge";

/**
 * バッジの表示エリア
 */
export default function Badges({badges}: {badges: Record<string, string>}) {
    return (
        <div className="mt-2 mx-2 flex gap-2 items-start flex-wrap">
            {badges && Object.entries(badges).map(([key, value]) => 
                <Badge key={key} color="orange">{value}</Badge>
            )}
        </div>
    );
}
