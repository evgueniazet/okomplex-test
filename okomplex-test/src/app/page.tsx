'use client';

import { Typography, Container } from '@mui/material';
import styles from './page.module.scss';
import { Feedback } from '@/components/Feedback/Feedback.tsx';
import { Product } from '@/components/Product/Product.tsx';
import { Cart } from '@/components/Cart/Cart.tsx';
import { useGetFeedback, useGetPageData } from './page.utils.ts';

export default function Home() {
    const feedback = useGetFeedback();
    const pageData = useGetPageData(1, 20);

    return (
        <main className={styles.main}>
            <Container className={styles.content}>
                <Typography className={styles.title} variant="h3" component="h3" gutterBottom>
                    Тестовое задание
                </Typography>
                <div className={styles.feedbackWrapper}>
                    {feedback.map((item, index) => (
                        <Feedback key={index} feedbackData={item.text} />
                    ))}
                </div>
                <Cart />
                <div className={styles.productsWrapper}>
                    {pageData?.products.map((item) => <Product key={item.id} product={item} />)}
                </div>
            </Container>
        </main>
    );
}
