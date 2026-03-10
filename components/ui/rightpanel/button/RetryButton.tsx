import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../common/Button";
import { faTurnUp } from "@fortawesome/free-solid-svg-icons";

type Props = {
    id?: string,
    showRetryInput: boolean,
    setShowRetryInput: (showRetryInput: boolean) => void,
};

/**
 * もっと盛るボタン
 */
export default function RetryButton({id, showRetryInput, setShowRetryInput}: Props) {
    const handleRetry = () => {
        if (!showRetryInput) {
            setShowRetryInput(true);
            return;
        }
    };

    return (
        <Button id={id} color="green" onClick={handleRetry}>
            <FontAwesomeIcon icon={faTurnUp} />
            もっと盛る
        </Button>
    );
}
