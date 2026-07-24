//import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    type DashboardStatistic,
    getDashboardStatistic,
    type CategorySummary,
    getCategorySummary,

} from "../services/dashboardService";
import { getLatestProducts } from "../services/productService";
import  type { Product } from "../types/product";
import CategoryChart from "../components/dashboard/CategoryChart";

export default function DashboardPage() {
    const [statistic, setStatistic] =
        useState<DashboardStatistic>({
            totalProducts: 0,
            totalCategories: 0,
            totalValue: 0,
            averagePrice: 0
        });
    const [latestProducts, setLatestProducts] = useState<Product[]>([]);
    const [categorySummary, setCategorySummary] = useState<CategorySummary[]>([])

    useEffect(() => {
        loadStatistic();
    }, []);
    async function loadStatistic() {
        const [ 
            statistic, 
            products,
            summary
        ] = await Promise.all([
            getDashboardStatistic(),
            getLatestProducts(),
            getCategorySummary(),
        ])
        setStatistic(statistic);
        setLatestProducts(products);
        setCategorySummary(summary);

    }
    //UI
    const maxProduct =
        Math.max(
            ...categorySummary.map(c => c.productCount),
            1
        );
    const totalProducts = categorySummary.reduce(
        (sum, item) => sum + item.productCount,
        0
    );

    return (
        <div>
            <div className="grid grid-cols-4 gap-6 mt-8">
                <div className="border rounded p-5">
                    <div className="text-gray-500">
                        Products
                    </div>
                    <div className="text-3xl font-bold mt-2">
                        {statistic.totalProducts}
                    </div>
                </div>
                <div className="border rounded p-5">
                    <div className="text-gray-500">
                        Categories
                    </div>
                    <div className="text-3xl font-bold mt-2">
                        {statistic.totalCategories}
                    </div>
                </div>
                <div className="border rounded p-5">
                    <div className="text-gray-500">
                        Total Value
                    </div>
                    <div className="text-3xl font-bold mt-2">
                        {statistic.totalValue.toLocaleString()} đ
                    </div>
                </div>
                <div className="border rounded p-5">
                    <div className="text-gray-500">
                        Average Price
                    </div>
                    <div className="text-3xl font-bold mt-2">
                        {Math.round(statistic.averagePrice).toLocaleString()} đ
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">
                    🆕 Latest Products
                </h2>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">
                                Image
                            </th>
                            <th className="border p-2">
                                Product
                            </th>
                            <th className="border p-2">
                                Category
                            </th>
                            <th className="border p-2">
                                Price
                            </th>
                            <th className="border p-2">
                                Created
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            latestProducts.map(product => (
                                <tr key={product.id}>
                                    <td className="border p-2 text-center">
                                        {
                                            product.image_url
                                                ? (
                                                    <img
                                                        src={product.image_url}
                                                        className="w-14 h-14 object-cover rounded mx-auto"
                                                    />
                                                )
                                                : "—"
                                        }
                                    </td>
                                    <td className="border p-2">
                                        {product.name}
                                    </td>
                                    <td className="border p-2">
                                        {product.category?.name}
                                    </td>
                                    <td className="border p-2 text-right">
                                        {Number(product.price).toLocaleString()} đ
                                    </td>
                                    <td className="border p-2 text-center">
                                        {new Date(product.created_at).toLocaleDateString("vi-VN")}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="mt-10">

                <h2 className="text-xl font-bold mb-5">

                    📊 Products by Category

                </h2>

                {

                    categorySummary
                        .filter(item => item.productCount > 0)
                        .sort((a, b) => b.productCount - a.productCount)
                        .map(item => (

                        <div
                            key={item.id}
                            className="mb-4"

                        >

                            <div className="flex justify-between mb-1">

                                <span>

                                    {item.name}

                                </span>

                                <span>

                                    {item.productCount} (
                                    {((item.productCount / totalProducts) * 100).toFixed(1)}%)
                                </span>

                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-4 transition-all duration-700">

                                <div
                                    className="bg-blue-500 h-4 rounded-full"
                                    style={{
                                        
                                        width: `${item.productCount /maxProduct * 100}%`
                                    }}
                                />

                            </div>

                        </div>

                    ))

                }

            </div>
            <CategoryChart
                data = {categorySummary.filter(item => item.productCount >0)}>

            </CategoryChart>
        </div>
    );
}