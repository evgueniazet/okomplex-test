import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Button, TextField } from '@mui/material';
import styles from './Product.module.scss';
import { TProductProps } from './Product.types';

export const Product = ({ product, selectedQuantity = 0, onQuantityChange }: TProductProps) => {
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const selectedProducts = localStorage.getItem('cart');

            if (selectedProducts) {
                const parsedSelectedProducts = JSON.parse(selectedProducts);
                if (parsedSelectedProducts[product.id]) {
                    setShowInput(true);
                }
            }
        }
    }, []);

    const handleBuyButtonClick = () => {
        setShowInput(true);
        onQuantityChange(product.id, 1);
    };

    const handleAddButtonClick = () => {
        onQuantityChange(product.id, selectedQuantity + 1);
    };

    const handleRemoveButtonClick = () => {
        let newSelectedQuantity = selectedQuantity;

        if (selectedQuantity > 0) {
            newSelectedQuantity = newSelectedQuantity - 1;
            onQuantityChange(product.id, newSelectedQuantity);
        }

        if (newSelectedQuantity === 0) {
            setShowInput(false);
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        onQuantityChange(product.id, Number(value));
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
                        value={selectedQuantity}
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
