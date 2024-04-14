import { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import styles from './Cart.module.scss';
import { PhoneMask } from '../PhoneMask/PhoneMask';
import { TCartProps } from './Cart.types';
import { fetchBuyProduct } from './Cart.utils';

const PHONE_NUMBER_QUANTITY = 11;

export const Cart = ({ products, selectedProducts, onPopupStateChange }: TCartProps) => {
    const [phoneNumber, setPhoneNumber] = useState<string>(
        typeof window !== 'undefined' ? localStorage.getItem('phoneNumber') || '' : ''
    );
    const [error, setError] = useState<string>('');
    const cartProducts = products?.filter((product) => Object.keys(selectedProducts).some((item) => Number(item) === product.id));

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('phoneNumber', phoneNumber);
        }
    }, [phoneNumber]);

    const handleBuyButtonClick = async () => {
        const phoneNumberArr = phoneNumber.split('');
        const phoneNumberArrFiltered = phoneNumberArr.filter((item) =>
            !Number.isNaN(Number(item))
        );

        if (phoneNumberArrFiltered.length === PHONE_NUMBER_QUANTITY) {
            const cartItems = Object.entries(selectedProducts);
            const cartItemsArr = cartItems.map((item) => ({ id: Number(item[0]), quantity: item[1] }));
            setError('');
            const response = await fetchBuyProduct(phoneNumberArrFiltered.join(''), cartItemsArr);
            onPopupStateChange(response);
        } else {
            setError('Номер телефона введён неверно!');
        }
    };

    const isProductsEmpty = Object.keys(selectedProducts).length === 0;

    return (
        <div className={styles.wrapper}>
            <Typography className={styles.title} variant="h6" component="h6" gutterBottom>
                Добавленные товары
            </Typography>
            {cartProducts?.map((product) => {
                const productQuantity = Object.entries(selectedProducts).find((item) => Number(item[0]) === product.id)?.[1];
                return (
                    <div className={styles.content}>
                        <span>{product.title}</span>
                        <span>x{productQuantity}</span>
                        <span>{product.price * (productQuantity || 0)}$</span>
                    </div>
                )
            })}

            {error &&
                <div className={styles.error}>{error}</div>
            }
            <div className={styles.container}>
                <PhoneMask
                    className={error ? styles.inputError : styles.input}
                    value={phoneNumber}
                    onChange={(e) => {
                        setPhoneNumber(e.target.value);
                    }}
                />
                <Button
                    className={styles.button}
                    variant="contained"
                    color="primary"
                    onClick={handleBuyButtonClick}
                    disabled={isProductsEmpty}
                >
                    Купить
                </Button>
            </div>
        </div>
    );
};
