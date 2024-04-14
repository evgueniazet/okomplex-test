export type TProduct = {
    id: number;
    image_url: string;
    title: string;
    description: string;
    price: number;
};

export type TFeedback = {
    id: number;
    text: string;
};

export type TPageData = {
    page: number;
    amount: number;
    total: number;
    products: TProduct[];
};

export type TSelectedProducts = Record<number, number>;
