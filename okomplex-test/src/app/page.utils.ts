import { useState, useEffect, Ref, RefObject } from 'react';
import axios from 'axios';
import { TPageData, TFeedback } from './page.types';

const options = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const PRODUCTS_QUANTITY = 20;

export const useGetFeedback = () => {
    const [feedback, setFeedback] = useState<TFeedback[]>([]);

    const fetchFeedback = async () => {
        try {
            const response = await axios.get('http://o-complex.com:1337/reviews', options);

            setFeedback(response.data);
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, []);

    return feedback;
};

export const useGetPageData = () => {
    const [pageData, setPageData] = useState<TPageData>();

    const fetchPageData = async (page?: number) => {
        const pageNumber = page ? page : 1;

        try {
            const response = await axios.get(
                `http://o-complex.com:1337/products?page=${pageNumber}&page_size=${PRODUCTS_QUANTITY}`,
                options,
            );
            const newProducts = response.data.products;
            const oldProducts = pageData?.products ?? [];
            const allProducts = [...oldProducts, ...newProducts];
            const pageDataCopy = { ...response.data };

            pageDataCopy.products = allProducts;

            setPageData(pageDataCopy);
        } catch (error) {
            console.error('Error fetching page data:', error);
        }
    };

    useEffect(() => {
        fetchPageData();
    }, [PRODUCTS_QUANTITY]);

    return { pageData, fetchPageData };
};

export const useGetDataOnScroll = (
    mainRef: RefObject<HTMLDivElement> | null,
    fetchPageData: (page?: number) => Promise<void>,
    pageData?: TPageData,
) => {
    const [isLoading, setLoading] = useState(false);

    const handleScroll = async () => {
        if (
            (mainRef?.current?.offsetHeight || 0) + (mainRef?.current?.scrollTop || 0) + 2 >=
            (mainRef?.current?.scrollHeight || 0)
        ) {
            setLoading(false);
            if (!pageData) return;
            const pagesQuantity = Math.ceil(pageData?.total / PRODUCTS_QUANTITY);

            if (pageData.page < pagesQuantity && !isLoading) {
                setLoading(true);
                await fetchPageData(pageData.page + 1);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const main = mainRef?.current;

        main?.addEventListener('scroll', handleScroll);

        return () => {
            main?.removeEventListener('scroll', handleScroll);
        };
    }, [mainRef, pageData, isLoading, setLoading]);
};
