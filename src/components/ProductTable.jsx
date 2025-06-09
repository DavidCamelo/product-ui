import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">User</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                 {products.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-4">No products found.</td></tr>
                ) : products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-100">
                        <td className="py-3 px-4">{product.id}</td>
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="py-3 px-4">{product.description}</td>
                        <td className="py-3 px-4">{product.user ? `${product.user.name} ${product.user.lastName}` : 'N/A'}</td>
                        <td className="py-3 px-4 text-center">
                            <button onClick={() => onEdit(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                            <button onClick={() => onDelete(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default ProductTable;
