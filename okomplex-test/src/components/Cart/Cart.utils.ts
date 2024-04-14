import axios from 'axios';
import { TCart, EResponseTypes } from './Cart.types';

const options = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export const fetchBuyProduct = async (phoneNumber: string, cartItems: TCart[]) => {
    try {
        await axios.post(
            'http://o-complex.com:1337/order',
            {
                phone: phoneNumber,
                cart: cartItems,
            },
            options,
        );
        return {
            type: EResponseTypes.Success,
            message: 'Покупка товара успешна',
        };
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return {
            type: EResponseTypes.Error,
            message: 'Покупка товара не удалась',
        };
    }
};
