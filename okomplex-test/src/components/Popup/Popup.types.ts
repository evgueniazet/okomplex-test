import { Dispatch, SetStateAction } from 'react';
import { TPopupState } from '../Cart/Cart.types';

export type TPopupProps = {
    popupState?: TPopupState;
    setPopupState: Dispatch<SetStateAction<TPopupState | undefined>>;
};
