import Button from "../../common/Button";

type ErrorSectionProps = {
  error: string | null,
  onResend: () => void,
};

/**
 * エラー表示
 */
export default function ErrorSection({error, onResend}: ErrorSectionProps) {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-2 text-red-600">
                <p className="font-bold">エラーが発生しました</p>
                <p className="text-sm">{error}</p>
                <Button color="blue" onClick={onResend}>再送する</Button>
            </div>
        </div>
    );
}
