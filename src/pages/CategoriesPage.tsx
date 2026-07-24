import { useEffect, useState } from "react";

import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";
import type {Category } from "../types/category";

import {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
} from "../services/categoryService";


export default function CategoriesPage() {

    const [categories, setCategories] = useState<Category[]>([]);

    const [showForm, setShowForm] = useState(false);

    const [currentCategory, setCurrentCategory] = useState<Category>({
        name: "",
        description: "",
    });

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {

        const data = await getCategories();

        setCategories(data ?? []);

    }

    function addNew() {

        setCurrentCategory({
            name: "",
            description: "",
        });

        setShowForm(true);

    }

    function editCategory(category: Category) {

        setCurrentCategory(category);

        setShowForm(true);

    }

    async function saveCategory(category: Category) {

        if (category.id) {

            await updateCategory(category);

        } else {

            await addCategory(category);

        }

        setShowForm(false);

        loadCategories();

    }

    async function removeCategory(id: string) {

        await deleteCategory(id);

        loadCategories();

    }

    function cancelEdit() {

        setShowForm(false);

    }

    return (

        <>

            <h2 className="text-2xl font-bold mb-5">

                Categories

            </h2>
            
            {showForm && (

                <CategoryForm
                    category={currentCategory}
                    saveCategory={saveCategory}
                    cancelEdit={cancelEdit}
                />

            )}
            <div className="flex justify-between items-center mb-5">

                <input
                    type="text"
                    placeholder="Search category..."
                    className="border rounded px-3 py-2 w-96"
                />

                <button
                    onClick={addNew}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                    Add New Category
                </button>

            </div>

            <CategoryTable
                categories={categories}
                editCategory={editCategory}
                deleteCategory={removeCategory}
            />

        </>

    );

}