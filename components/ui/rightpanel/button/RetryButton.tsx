import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../common/Button";
import { faTurnUp } from "@fortawesome/free-solid-svg-icons";

type Props = {
    showRetryInput: boolean,
    setShowRetryInput: (showRetryInput: boolean) => void,
};

/**
 * もっと盛るボタン
 */
export default function RetryButton({showRetryInput, setShowRetryInput}: Props) {
    const handleRetry = () => {
        if (!showRetryInput) {
            setShowRetryInput(true);
            return;
        }
    };

    return (
        <Button color="green" onClick={handleRetry}>
            <FontAwesomeIcon icon={faTurnUp} />
            もっと盛る
        </Button>
    );
}
