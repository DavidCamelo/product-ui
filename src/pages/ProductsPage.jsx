import React, { useState, useEffect } from 'react';
import { productService, userService } from '../services/api';
import Modal from 'components_ui/Modal';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import './products.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

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
            setCurrentProduct(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
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
        setCurrentProduct(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Product Management</h1>
                <button onClick={() => { setCurrentProduct(null); setIsModalOpen(true); }} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Add Product</button>
            </div>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

            <Modal isOpen={isModalOpen} onClose={handleCancel} title={currentProduct ? 'Edit Product' : 'Add Product'}>
                <ProductForm currentProduct={currentProduct} users={users} onSave={handleSave} onCancel={handleCancel} />
            </Modal>

            <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default ProductsPage;
