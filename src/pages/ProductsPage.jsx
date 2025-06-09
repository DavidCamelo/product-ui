import React, { useState, useEffect } from 'react';
import { productService, userService } from '../services/api';
import Modal from 'components_ui/Modal';
import Table from 'components_ui/Table';
import Form from 'components_ui/Form';
import './products.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    const productColumns = [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'description', header: 'Description' },
      { key: 'user', header: 'User', render: (row) => row.user.error ? `${row.user.error.message}` : `${row.user.name} ${row.user.lastName}` },
    ];

    const productFields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
        {
            name: 'user',
            label: 'User',
            type: 'select',
            placeholder: 'Select a user',
            options: users.map(u => ({ value: u.id, label: `${u.name} ${u.lastName}` }))
        },
    ];

    const fetchProductsAndUsers = async () => {
        try {
            setError(null);
            const [productData, userData] = await Promise.all([
                productService.getProducts(),
                userService.getUsers()
            ]);
            setProducts(productData);
            setUsers(userData);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProductsAndUsers();
    }, []);

    const handleSave = async (product) => {
        try {
            setError(null);
            if (product.id) {
                await productService.updateProduct(product.id, product);
            } else {
                await productService.createProduct(product);
            }
            fetchProductsAndUsers();
            setIsModalOpen(false);
            setCurrentItem(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (product) => {
        setCurrentItem(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
       if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                setError(null);
                await productService.deleteProduct(id);
                fetchProductsAndUsers();
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
        setError(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Product Management</h1>
                <button onClick={() => { setCurrentItem({}); setIsModalOpen(true); }} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Add Product</button>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCancel} title={currentItem?.id ? 'Edit Product' : 'Add Product'}>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                <Form
                    fields={productFields}
                    initialData={currentItem}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            </Modal>

            <Table columns={productColumns} data={products} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default ProductsPage;
