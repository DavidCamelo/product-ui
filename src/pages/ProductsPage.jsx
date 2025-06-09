import React, { useState, useEffect } from 'react';
import { productService, userService } from '../services/api';
import Modal from 'components_ui/Modal';
import ConfirmationModal from 'components_ui/ConfirmationModal';
import Table from 'components_ui/Table';
import Form from 'components_ui/Form';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [error, setError] = useState(null);

    const productColumns = [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'description', header: 'Description' },
      { key: 'user', header: 'User', render: (row) => row.user ? `${row.user.name} ${row.user.lastName}`: 'N/A' },
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
            setIsFormModalOpen(false);
            setCurrentItem(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (product) => {
        setCurrentItem(product);
        setIsFormModalOpen(true);
    };

    const handleDelete = (id) => {
       setItemToDelete(id);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            try {
                setError(null);
                await productService.deleteProduct(itemToDelete);
                fetchProductsAndUsers();
            } catch (error) {
                setError(error.message);
            } finally {
                setItemToDelete(null);
            }
        }
    };

    const handleCancel = () => {
        setIsFormModalOpen(false);
        setCurrentItem(null);
        setError(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Product Management</h1>
                <button onClick={() => { setCurrentItem({}); setIsFormModalOpen(true); }} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Add Product</button>
            </div>

            <Modal isOpen={isFormModalOpen} onClose={handleCancel} title={currentItem?.id ? 'Edit Product' : 'Add Product'}>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                <Form
                    fields={productFields}
                    initialData={currentItem}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            </Modal>

            <ConfirmationModal
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
            >
                Are you sure you want to delete this product? This action cannot be undone.
            </ConfirmationModal>

            <Table columns={productColumns} data={products} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default ProductsPage;
