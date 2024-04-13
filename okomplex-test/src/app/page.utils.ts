import { useState, useEffect } from 'react';
import axios from 'axios';
import { TPageData, TFeedback } from './page.types';

const options = {
    headers: {
        'Content-Type': 'application/json',
    },
};

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

export const useGetPageData = (page: number, pageSize: number) => {
    const [pageData, setPageData] = useState<TPageData>();

    const fetchPageData = async () => {
        try {
            const response = await axios.get(
                `http://o-complex.com:1337/products?page=${page}&page_size=${pageSize}`,
                options,
            );

            setPageData(response.data);
        } catch (error) {
            console.error('Error fetching page data:', error);
        }
    };

    useEffect(() => {
        fetchPageData();
    }, [page, pageSize]);

    return pageData;
};
