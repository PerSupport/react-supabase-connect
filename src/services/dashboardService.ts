export interface DashboardStatistic {
    totalProducts: number;
    totalCategories: number;
    totalValue: number;
    averagePrice: number;
}
export type CategorySummary = {

    id: string;

    name: string;

    productCount: number;

};
import { supabase } from "../lib/supabase";

export async function getDashboardStatistic(): Promise<DashboardStatistic> {
    const [
        { data: products },
        { count }
    ] = await Promise.all([
        supabase
            .from("sanpham")
            .select("price"),

        supabase
            .from("category")
            .select("*", { count: "exact", head: true })
    ]);

    const totalProducts = products?.length ?? 0
    const totalCategories = count ?? 0
    const totalValue = 
        products?.reduce((sum,product) => sum + Number(product.price),0) ?? 0
    const averagePrice = 
        totalProducts!= 0   ? totalValue/totalProducts : 0

    return {
        totalProducts,
        totalCategories,
        totalValue,
        averagePrice
    }
}

export async function getCategorySummary(): Promise<CategorySummary[]> {

    const { data: categories, error } = await supabase
        .from("category")
        .select(`
            id,
            name,
            sanpham (
                id
            )
        `);

    if (error) throw error;

    return categories.map(category => ({

        id: category.id,

        name: category.name,

        productCount: category.sanpham.length

    }));

}