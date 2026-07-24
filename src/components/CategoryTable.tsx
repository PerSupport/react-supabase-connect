import type { Category } from '../types/category';

type Props = {
    categories : Category[];
    editCategory : (category :Category ) => void,
    deleteCategory : (id: string) => void
}

export default function CategoryTable ({
    categories,
    editCategory,
    deleteCategory
 } : Props) {
    return (
        <div className="bg-white rounded shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="border px-4 py-2 text-left w-20">

                            No.

                        </th>

                        <th className="border px-4 py-2 text-left">

                            Category Name

                        </th>

                        <th className="border px-4 py-2 text-left">

                            Description

                        </th>

                        <th className="border px-4 py-2 text-center w-48">

                            Action

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {categories.map((category, index) => (

                        <tr key={category.id}>

                            <td className="border px-4 py-2">

                                {index + 1}

                            </td>

                            <td className="border px-4 py-2">

                                {category.name}

                            </td>

                            <td className="border px-4 py-2">

                                {category.description}

                            </td>

                            <td className="border px-4 py-2 text-center">

                                <button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => editCategory(category)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                    onClick={() => {
                                        if (confirm("Delete this category?")) {
                                            deleteCategory(category.id!);
                                        }
                                    }}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                    {categories.length === 0 && (

                        <tr>

                            <td
                                colSpan={4}
                                className="text-center py-6 text-gray-500"
                            >

                                No data

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    )
 }