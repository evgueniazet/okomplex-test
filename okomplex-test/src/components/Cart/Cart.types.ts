import { TProduct } from '@/app/page.types';
import { TSelectedProducts } from '@/app/page.types';

export type TCart = {
    id: number;
    quantity: number;
};

export type TCartData = {
    phone: string;
    cart: TCart[];
};

export type TPopupState = {
    type: string;
    message: string;
};

export type TCartProps = {
    products?: TProduct[];
    selectedProducts: TSelectedProducts;
    onPopupStateChange: (response: TPopupState) => void;
};

export enum EResponseTypes {
    Error = 'Error',
    Success = 'Success',
}
