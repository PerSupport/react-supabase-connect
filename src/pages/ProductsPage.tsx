import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../services/productService";
import { getCategories } from "../services/categoryService";
import useRealtime from "../hooks/useProductRealtime"
import { supabase } from "../lib/supabase";

export default function ProductsPage() {
    // ============================
    // State
    // ============================
    const [products, setProducts] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>({
        name: "",
        price: 0,
        category_id: "",
        description: "",
        image_url: "",
    });
    const [categories, setCategories] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [sortField, setSortField ] = useState("")
    const [sortDirection, setSortDirection ] = useState<"asc" | "desc">("asc")
    const [currentPage, setCurrentPage] = useState(1)
    const [displayProducts,setDisplayProducts] = useState<any[]>([])
    const pageSize = 10
    // ============================
    // Load
    // ============================
    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);
    
    async function loadProducts() {
        const data = await getProducts();
        //Search
        //Filter
        //Sort
        //Pagigation
        const list = data ?? [];
        setProducts(list);
        setFilteredProducts(list);
    }

    async function loadCategories() {
        const data = await getCategories();
        setCategories(data ?? []);
    }

    useEffect(() => {
        applyFilters();
    }, [searchText,selectedCategory, sortField, sortDirection,currentPage, products]);

    useRealtime({
        table : "sanpham",
        onChanged: loadProducts,
    });

    function applyFilters() {
        let result = [...products];
        //=========================
        // Search
        //=========================
        if (searchText.trim() !== "") {
            const keyword = searchText.toLowerCase();
            result = result.filter(product =>
                product.name.toLowerCase().includes(keyword)
                ||
                product.description.toLowerCase().includes(keyword)
            );
        }
        //=========================
        // Category filter
        //=========================
        
        if (selectedCategory !== ""){
            result = result.filter(product =>
                product.category_id === selectedCategory
            )
        }
        //=========================
        // Sort
        //=========================
        if (sortField !== "") {
            result.sort((a, b) => {
                let valueA = a[sortField];
                let valueB = b[sortField];
                if (typeof valueA === "string") {
                    valueA = valueA.toLowerCase();
                    valueB = valueB.toLowerCase();
                }
                if (valueA < valueB)
                    return sortDirection === "asc" ? -1 : 1;
                if (valueA > valueB)
                    return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
        }
        //=========================
        // Pagination
        //=========================
        setFilteredProducts(result);

        const totalPages = Math.max(1, Math.ceil(result.length / pageSize));
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
            return;
        }
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        setDisplayProducts(result.slice(start, end));
    }
    function handleSort(field : string) {
        if (sortField === field) {
            setSortDirection(sortDirection =="asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }

    }

    // ============================
    // CRUD
    // ============================
    function addNew() {
        setEditingProduct({
            name: "",
            price: 0,
            category_id: "",
            description: "",
            image_url: "",
        });
        setShowForm(true);
    }
    function editProduct(product: any) {
        setEditingProduct(product);
        setShowForm(true);
    }
    async function saveProduct(product: any) {
        if (product.id) {
            await updateProduct(product);
        }
        else {
            await addProduct(product);
        }
        setShowForm(false);
        setEditingProduct(null);
        loadProducts();
    }
    async function removeProduct(id: string) {
        const ok = confirm("Bạn có chắc muốn xóa sản phẩm này?");
        if (!ok) return;
        await deleteProduct(id);
        loadProducts();
    }
    function cancelEdit() {
        setEditingProduct(null);
        setShowForm(false);
    }
    // ============================
    // edge fuction
    // ============================
    async function generateProducts() {
        // const res = await fetch(
        //     "https://yrkjfgbzonbqukornqvj.supabase.co/functions/v1/generate-products",
        //     {
        //         method: "POST",
        //         headers: {
        //         "Content-Type": "application/json",
        //         apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        //         },
        //         body: JSON.stringify({ count: 5 }),
        //     }
        //     );

        //     console.log(await res.text());
        const { data, error } = await supabase.functions.invoke(
            "generate-products",
            {
                body: {
                    count: 5,
                },
            }
        );
        const { data: sessionData } = await supabase.auth.getSession();
        console.log("Session:", sessionData.session);
        console.log("Data:", data);
        console.log("Error:", error);

    }
    // ============================
    // UI
    // ============================
    const totalRecords = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
    const startRecord = (currentPage - 1) * pageSize + 1;
    const endRecord = Math.min(
        currentPage * pageSize,
        totalRecords
    );
    const pages = Array.from(
        {length: totalPages },
        (_,index) => index + 1
    )

    return (
        <>
            <h2 className="text-2xl font-bold mb-5">
                Products
            </h2>
            <button
                onClick={generateProducts}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Generate 5 Products
            </button>
            {
                showForm && (
                    <ProductForm
                        product={editingProduct}
                        categories={categories}
                        onSave={saveProduct}
                        onCancel={cancelEdit}
                    />
                )
            }
            <div className="bg-white border rounded shadow p-4 mb-5">
               <div className="flex items-center gap-4">
                   <div>
                       <label className="block text-sm font-medium mb-1">
                           Search
                       </label>
                       <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search product..."
                            className="border rounded px-3 py-2 w-80"
                        />
                   </div>
                   <div>
                       <label className="block text-sm font-medium mb-1">
                           Category
                       </label>
                       <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border rounded px-3 py-2 w-60"
                        >
                           <option value="">
                               All
                           </option>
                           {categories.map(category => (
                               <option
                                    key={category.id}
                                    value={category.id}
                                >
                                   {category.name}
                               </option>
                           ))}
                       </select>
                   </div>
                   <div className="ml-auto pt-6">
                       <button
                            onClick={addNew}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                           + Add Product
                       </button>
                   </div>
               </div>
           </div>
            <ProductTable
                products={displayProducts}
                onEdit={editProduct}
                onDelete={removeProduct}
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={handleSort}
                pageSize={pageSize}
                currentPage={currentPage}
            />

            <div className="flex justify-center items-center gap-2 mt-5">
                <div className="text-sm text-gray-600">
                    Showing {startRecord} - {endRecord} of {totalRecords} products
                </div>
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="border px-3 py-1 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={
                                currentPage === page
                                    ? "bg-blue-600 text-white px-3 py-1 rounded"
                                    : "border px-3 py-1 rounded"
                            }
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        disabled={currentPage * pageSize >= filteredProducts.length}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="border px-3 py-1 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}