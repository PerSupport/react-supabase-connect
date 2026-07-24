import { supabase } from "../lib/supabase";

export async function getProducts() {

    const { data, error } = await supabase
        .from("sanpham")
        .select(`
            *,
            category (
            id,
            name
            )
        `)
        .order("name");

    if (error) {

        console.error(error);

        return [];

    }
    return data;
}

export async function addProduct(product: {
    name: string;
    price: number;
    description: string;
    category_id: string;
    image_url: string;
}) {

    const { error } = await supabase
        .from("sanpham")
        .insert(product);

    if (error) {
        throw error;
    }

}

export async function updateProduct(product: any) {

    const { error } = await supabase

        .from("sanpham")

        .update({

            name: product.name,

            price: product.price,

            description: product.description,
            
            category_id: product.category_id,
            image_url: product.image_url

        })

        .eq("id", product.id);

    if (error)

        throw error;

}
export async function deleteProduct(id: string) {

    const { error } = await supabase
        .from("sanpham")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }

}
// 5 lastest product
export async function getLatestProducts(limit = 5) {

    const { data, error } = await supabase
        .from("sanpham")
        .select(`
            *,
            category (
                name
            )
        `)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) throw error;

    return data;
}