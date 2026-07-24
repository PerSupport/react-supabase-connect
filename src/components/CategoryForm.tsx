import type { Category } from '../types/category';
import { useEffect, useState } from 'react';

type Props = {
    category: Category;
    saveCategory: (category: Category) => void;
    cancelEdit: () => void;
};

export default function CategoryForm({
    category,
    saveCategory,
    cancelEdit,
}: Props) {

    const [formData, setFormData] = useState<Category>(category);

    useEffect(() => {
        setFormData(category);
    }, [category]);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }
    

    function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        saveCategory(formData);

    }

    return (

        <div className="bg-white rounded shadow p-5 mb-5">

            <h2 className="text-xl font-bold mb-4">

                {formData.id ? "Edit Category" : "Add Category"}

            </h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-4">

                    <label className="block mb-1">

                        Category Name

                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded w-full px-3 py-2"
                        required
                    />

                </div>

                <div className="mb-4">

                    <label className="block mb-1">

                        Description

                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border rounded w-full px-3 py-2"
                        rows={3}
                    />

                </div>

                <div className="flex gap-3">

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={cancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

}