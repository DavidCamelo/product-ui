import React, { useState, useEffect } from 'react';
import { ResourcePage } from 'components_ui/ResourcePage';
import { productService, userService } from '../services/api';
import './products-page.css';

export const ProductsPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await userService.getAll();
                setUsers(usersData);
            } catch (error) {
                console.error("Failed to load users for product form", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const productConfig = {
        title: 'Product Management',
        resourceName: 'Product',
        service: productService,
        columns: [
            { key: 'id', header: 'ID' },
            { key: 'name', header: 'Name' },
            { key: 'description', header: 'Description' },
            { key: 'user', header: 'User', render: (row) => row.user ? (row.user.error ?  `${row.user.error.message}` : `${row.user.name} ${row.user.lastName}`) : 'N/A' },
        ],
        formFields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'description', label: 'Description', type: 'text' },
            {
                name: 'user',
                label: 'User',
                type: 'select',
                placeholder: 'Select a user',
                options: users.map(u => ({ value: u.id, label: `${u.name} ${u.lastName}` })),
            },
        ],
    };

    if (loading) {
        return <div className="text-center p-4">Loading user data...</div>;
    }

    return <ResourcePage {...productConfig} />;
};
