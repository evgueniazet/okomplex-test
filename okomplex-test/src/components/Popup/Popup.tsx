import { Button } from '@mui/material';
import { TPopupProps } from "./Popup.types";
import { EResponseTypes } from "../Cart/Cart.types";
import styles from './Popup.module.scss';

export const Popup = ({ popupState, setPopupState }: TPopupProps) => {

    if (!popupState?.type) return;

    const handleConfirmButton = () => {
        setPopupState(undefined);
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <p className={popupState?.type === EResponseTypes.Error ? styles.error : styles.success}>{popupState?.message}</p>
                <Button
                    className={styles.button}
                    variant="contained"
                    color="primary"
                    onClick={handleConfirmButton}
                >
                    OK
                </Button>
            </div>
        </div>
    )
};