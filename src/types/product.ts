export type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    category_id?: string;
    created_at: Date;
    image_url: string;
    category? : {
        id: string;
        name: string;
    }
};