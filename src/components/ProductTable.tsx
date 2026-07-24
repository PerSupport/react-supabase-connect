type Props = {
    products: any[];
    onEdit: (product: any) => void;
    onDelete: (id: string) => void;
    sortField: string;
    sortDirection: string;
    handleSort: (field: string) => void;
    pageSize: number;
    currentPage: number;
};
export default function ProductTable({
    products,
    onEdit,
    onDelete,
    sortField,
    sortDirection,
    handleSort,
    pageSize,
    currentPage,
}: Props) {
    function formatPrice(price: number) {
        return Number(price).toLocaleString("vi-VN") + " đ";
    }
    function formatDate(date: string) {
        if (!date) return "";
        return new Date(date).toLocaleDateString("vi-VN");
    }
    function sortIcon(field: string) {
    if (sortField !== field)
        return "";

        return sortDirection === "asc"
            ? " ▲"
            : " ▼";
    }
    return (
        <div className="bg-white rounded shadow border">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 w-16 text-center">
                            STT
                        </th>
                        <th 
                            onClick={() => handleSort("name")}
                            className="border p-2 text-left cursor-pointer select-none">
                            Tên sản phẩm {sortIcon("name")}
                        </th>
                        <th className="border p-2 text-right w-40">
                            Loại sản phẩm
                        </th>
                        <th 
                            onClick={() => handleSort("price")}
                            className="border p-2 text-right w-40 cursor-pointer select-none">
                            Giá {sortIcon("price")}
                        </th>
                        <th className="border p-2">
                            Mô tả
                        </th>
                        <th className="border px-4 py-2 text-center w-28">
                            Image
                        </th>
                        <th className="border p-2 w-36">
                            Ngày tạo
                        </th>
                        <th className="border p-2 w-44">
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length === 0 && (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="border p-5 text-center text-gray-500"
                                >
                                    Chưa có dữ liệu
                                </td>
                            </tr>
                        )
                    }
                    {
                        products.map((product, index) => (
                            <tr
                                key={product.id}
                                className="hover:bg-gray-200"
                            >
                                <td className="border p-2 text-center">
                                     {(currentPage-1) * pageSize + index + 1} 
                                </td>
                                <td className="border p-2">
                                    {product.name}
                                </td>
                                <td className="border px-4 py-2">
                                    {product.category?.name ?? ""}
                                </td>
                                <td className="border p-2 text-right">
                                    {formatPrice(product.price)}
                                </td>
                                <td className="border p-2">
                                    {product.description}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    {
                                        product.image_url ? (
                                            <img src={product.image_url}
                                                 alt={product.name}
                                                 className="w-16 h-16 object-cover rounded mx-auto"
                                            ></img>
                                        ) : (
                                            <span className="text-gray-400">
                                                no image
                                            </span>
                                        )                                      
                                    }
                                </td>
                                <td className="border p-2 text-center">
                                    {formatDate(product.created_at)}
                                </td>
                                <td className="border p-2">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                            onClick={() => onEdit(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                            onClick={() => onDelete(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}