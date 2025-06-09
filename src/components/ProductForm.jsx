import React, { useState, useEffect } from 'react';

const ProductForm = ({ currentProduct, users, onSave, onCancel }) => {
    const [product, setProduct] = useState(currentProduct || { name: '', description: '', user: null });

    useEffect(() => {
        setProduct(currentProduct || { name: '', description: '', user: null });
    }, [currentProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "userId") {
            const selectedUser = users.find(u => u.id === parseInt(value));
            setProduct({ ...product, user: selectedUser });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(product);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                <input type="text" name="description" value={product.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">User</label>
                <select name="userId" value={product.user ? product.user.id : ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                    <option value="">Select a user</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name} {user.lastName}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center justify-end space-x-4">
                <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save</button>
            </div>
        </form>
    );
};

export default ProductForm;
