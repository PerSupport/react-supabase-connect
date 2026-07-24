import { useEffect, useState } from "react";
import { uploadProductImage, deleteProductImage } from "../services/storageService";

type Props = {
    product?: any;
    categories: any[];
    onSave: (product: any) => void;
    onCancel: () => void;
};

export default function ProductForm({ 
    product, 
    categories,
    onSave, 
    onCancel 
}: Props) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl,setPreviewUrl] = useState("")

    useEffect(() => {
        if (product.id) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategoryId(product.category_id ?? "")

            if (product.image_url) {
                setPreviewUrl(product.image_url);
                } else {
                    setPreviewUrl("");
            }
            setSelectedFile(null);
        }
        else {
            setName("");
            setPrice(0);
            setDescription("");
            setCategoryId("");

        }
        
    }, [product]);


    async function save() {

        if (name.trim() == "") {
            alert("Vui lòng nhập tên sản phẩm.");
            return;
        }

        if (price <= 0) {
            alert("Giá sản phẩm phải lớn hơn 0.");
            return;
        }

        if (categoryId == "") {
        alert("Vui lòng chọn loại sản phẩm.");
        return;
        }





        let imageUrl = product.image_url;

        if (selectedFile) {

            imageUrl = await uploadProductImage(selectedFile)
            try {
                if(product.image_url) {
                await deleteProductImage(product.image_url)
            }
            } catch (error) {
                 console.warn("Không thể xóa ảnh cũ:", error);
            }
        
        }

        onSave({
            id: product?.id,
            name,
            price,
            description,
            category_id: categoryId,
            image_url: imageUrl
        });
        // setSelectedFile(null);
        // setPreviewUrl("");
    }

    return (

        <div className="bg-white border rounded shadow p-5 mb-5">
            <h2 className="text-xl font-bold mb-5">
                {product.id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
            </h2>
            <div className="grid grid-cols-2 gap-8 items-start">
                <div >
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Tên sản phẩm
                        </label>
                        <input
                            className="border rounded w-full p-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Giá
                        </label>
                        <input
                            type="number"
                            className="border rounded w-full p-2"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">
                            Category
                        </label>
                        <select
                            name="category_id"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="border rounded w-full px-3 py-2"
                            required
                        >
                            <option value="">
                                -- Select Category --
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
                    <div className="mb-5">
                        <label className="block mb-1 font-medium">
                            Mô tả
                        </label>
                        <textarea
                            rows={4}
                            className="border rounded w-full p-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>            
                <div>
                    <label className="block mb-1">
                        Product Image
                    </label>
                    <input
                        id="productImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files?.length) {
                                const file = e.target.files[0]
                                // validate
                                if (!file.type.startsWith("image/")) {
                                    alert("Vui lòng chọn file ảnh.");
                                    return;
                                }
                                if (file.size > 2 * 1024 * 1024) {
                                    alert("Ảnh không được lớn hơn 2MB.");
                                    return;
                                }
                                //
                                setSelectedFile(file);
                                setPreviewUrl(URL.createObjectURL(file));
                            }
                        }}
                    />
                    <div className="mt-3 flex items-center gap-3">
                        <label
                            htmlFor="productImage"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer transition"
                        >
                            {selectedFile ? "🔄 Đổi ảnh" : "📁 Chọn ảnh"}
                        </label>

                        <span className="text-gray-600">

                            {selectedFile
                                ? selectedFile.name
                                : previewUrl
                                    ? "Ảnh hiện tại" 
                                    : "Chưa chọn ảnh"}

                        </span>
                        {selectedFile &&
                            <span className="text-sm text-gray-500">

                                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)

                            </span>
                        }
                    </div>
                    {previewUrl && (
                        <div className="border rounded-lg p-3 bg-gray-50">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-40 h-40 object-cover border rounded"
                            />
                        </div>
                    )}
                </div>
            </div> 
            <div className="flex gap-3">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    onClick={save}
                >
                    {product.id ? "Update" : "Save"}
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>

    );

}