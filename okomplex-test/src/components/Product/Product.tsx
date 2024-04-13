import React, { useState } from 'react';
import { Typography, Box, Container, Button, TextField } from '@mui/material';
import styles from './Product.module.scss';
import { TProductProps } from './Product.types';

export const Product = ({ product }: TProductProps) => {
    const [quantity, setQuantity] = useState(1);
    const [showInput, setShowInput] = useState(false);

    const handleBuyButtonClick = () => {
        setShowInput(true);
    };

    const handleAddButtonClick = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleRemoveButtonClick = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        const value = parseInt(e.target.value);
        setQuantity(value);
    };

    return (
        <Box className={styles.wrapper}>
            <img className={styles.img} src={product.image_url} alt={product.title} />
            <Container className={styles.content}>
                <Typography className={styles.title} variant="h5" component="h2">
                    {product.title}
                </Typography>
                <div className={styles.descriptionContainer}>
                    <Typography
                        className={styles.description}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {product.description}
                    </Typography>
                </div>
            </Container>
            <Typography className={styles.text} variant="h6" color="textPrimary" component="p">
                Цена: {product.price}
            </Typography>
            {showInput ? (
                <div className={styles.inputWrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={styles.button}
                        onClick={handleRemoveButtonClick}
                    >
                        -
                    </Button>
                    <TextField
                        type="number"
                        className={styles.quantityInput}
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={styles.button}
                        onClick={handleAddButtonClick}
                    >
                        +
                    </Button>
                </div>
            ) : (
                <div className={styles.buttonWrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={styles.button}
                        onClick={handleBuyButtonClick}
                    >
                        Купить
                    </Button>
                </div>
            )}
        </Box>
    );
};
