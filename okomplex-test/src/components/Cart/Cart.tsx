import React from 'react';
import { Typography, Button } from '@mui/material';
import styles from './Cart.module.scss';
import { PhoneMask } from '../PhoneMask/PhoneMask';

export const Cart = () => {
    const [phoneNumber, setPhoneNumber] = React.useState<string>('');

    const handleBuyButtonClick = () => {
        console.log('phoneNumber', phoneNumber);
    };

    return (
        <div className={styles.wrapper}>
            <Typography className={styles.title} variant="h6" component="h6" gutterBottom>
                Добавленные товары
            </Typography>
            <div className={styles.content}>
                <span>Товар</span>
                <span>x3</span>
                <span>3645$</span>
            </div>
            <div className={styles.container}>
                <PhoneMask
                    className={styles.input}
                    value={phoneNumber}
                    onChange={(e) => {
                        setPhoneNumber(e.target.value);
                    }}
                ></PhoneMask>
                <Button
                    className={styles.button}
                    variant="contained"
                    color="primary"
                    onClick={handleBuyButtonClick}
                >
                    Купить
                </Button>
            </div>
        </div>
    );
};
