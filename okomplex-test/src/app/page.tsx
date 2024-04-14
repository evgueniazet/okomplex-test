'use client';

import { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import styles from './page.module.scss';
import { Feedback } from '@/components/Feedback/Feedback.tsx';
import { Product } from '@/components/Product/Product.tsx';
import { Cart } from '@/components/Cart/Cart.tsx';
import { useGetFeedback, useGetPageData, useGetDataOnScroll } from './page.utils.ts';
import { TSelectedProducts } from './page.types.ts';
import { TPopupState } from '@/components/Cart/Cart.types.ts';
import { Popup } from '@/components/Popup/Popup.tsx';


export default function Home() {
    const mainRef = useRef<HTMLDivElement>(null);
    const feedback = useGetFeedback();
    const { pageData, fetchPageData } = useGetPageData();
    const [selectedProducts, setSelectedProducts] = useState<TSelectedProducts>({});
    const [popupState, setPopupState] = useState<TPopupState>();

    useGetDataOnScroll(mainRef, fetchPageData, pageData);

    const handleQuantityChange = (id: number, quantity: number) => {
        const selectedProductsUpdated = { ...selectedProducts };

        if (quantity === 0) {
            delete selectedProductsUpdated[id];
            setSelectedProducts(selectedProductsUpdated);
        } else {
            selectedProductsUpdated[id] = quantity;
            setSelectedProducts(selectedProductsUpdated);
        }
    };

    const handlePopupStateChange = (popupState: TPopupState) => {
        setPopupState(popupState);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedProducts = localStorage.getItem('cart');
            setSelectedProducts(storedProducts ? JSON.parse(storedProducts) : {});
        }
    }, []);

    return (
        <main ref={mainRef} className={styles.main}>
            <div className={styles.content}>
                <Typography className={styles.title} variant="h3" component="h3" gutterBottom>
                    Тестовое задание
                </Typography>
                <div className={styles.feedbackWrapper}>
                    {feedback.map((item, index) => (
                        <Feedback key={index} feedbackData={item.text} />
                    ))}
                </div>
                <Cart products={pageData?.products} selectedProducts={selectedProducts} onPopupStateChange={handlePopupStateChange} />
                <div className={styles.productsWrapper}>
                    {pageData?.products.map((item) =>
                        <Product
                            selectedQuantity={selectedProducts[item.id]}
                            onQuantityChange={handleQuantityChange}
                            key={item.id}
                            product={item}
                        />
                    )}
                </div>
            </div>
            <Popup setPopupState={setPopupState} popupState={popupState} />
        </main>
    );
}
