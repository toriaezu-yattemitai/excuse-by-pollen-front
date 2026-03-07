import Badge from "../common/Badge";

/**
 * バッジの表示エリア
 */
export default function Badges({badges}: {badges: Record<string, string>}) {

    return (
        <div className="pt-4 mt-4 flex gap-2 items-start flex-wrap">
            {badges && Object.entries(badges).map(([key, value]) => {
                return (
                    <Badge key={key}>{value}</Badge>
                )
            })}
        </div>
    );
}
