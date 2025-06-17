// API services for interacting with the backend
const createApiService = (resource) => {
    const API_URL = `https://spring-boot.davidcamelo.com/${resource}`;
    //const API_URL = `http://api-gateway:8080/${resource}`;

    const handleResponse = async (response) => {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || `Failed to perform operation on ${resource}`;
            throw new Error(errorMessage);
        }
        if (response.status === 204 || response.headers.get('Content-Length') === '0') {
            return;
        }
        return response.json();
    };

    return {
        getAll: async () => {
            const response = await fetch(API_URL);
            return handleResponse(response);
        },
        create: async (item) => {
            if (item.user) {
                item.user = { id: item.user };
            } else {
                delete item.user;
            }
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            return handleResponse(response);
        },
        update: async (id, item) => {
            if (item.user) {
                item.user = { id: item.user };
            } else {
                delete item.user;
            }
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            return handleResponse(response);
        },
        delete: async (id) => {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            return handleResponse(response);
        },
    };
};

export const userService = createApiService('users');
export const productService = createApiService('products');