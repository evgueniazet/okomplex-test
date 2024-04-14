export type TProductProps = {
    product: {
        id: number;
        image_url: string;
        title: string;
        description: string;
        price: number;
    };
    selectedQuantity: number;
    onQuantityChange: (id: number, quantity: number) => void;
};
