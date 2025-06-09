// API services for interacting with the backend
export const userService = {
  getUsers: async () => {
    const response = await fetch('https://spring-boot.davidcamelo.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },
};

export const productService = {
  getProducts: async () => {
    const response = await fetch('https://spring-boot.davidcamelo.com/products');
     if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },
  createProduct: async (product) => {
    const response = await fetch('https://spring-boot.davidcamelo.com/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to create product' }));
      throw new Error(errorData.message || 'Failed to create product');
    }
    return response.json();
  },
  updateProduct: async (id, product) => {
    const response = await fetch(`https://spring-boot.davidcamelo.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
     if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to update product' }));
      throw new Error(errorData.message || 'Failed to update product');
    }
    return response.json();
  },
  deleteProduct: async (id) => {
    const response = await fetch(`https://spring-boot.davidcamelo.com/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  },
};
