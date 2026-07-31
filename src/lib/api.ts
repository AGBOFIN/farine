// API service for Farine De La Capitale backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://farine-backend.onrender.com/api';

// Timeout configuration for API calls (Render can take up to 60s to wake up)
const API_TIMEOUT = 60000; // 60 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds between retries

// Helper function to add timeout to fetch
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = API_TIMEOUT): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - server took too long to respond');
    }
    throw error;
  }
};

// Helper function to retry failed requests
const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries = MAX_RETRIES,
  delay = RETRY_DELAY
): Promise<Response> => {
  try {
    return await fetchWithTimeout(url, options);
  } catch (error) {
    if (retries <= 0) throw error;
    
    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Retry with exponential backoff
    return fetchWithRetry(url, options, retries - 1, delay * 2);
  }
};

// Handle 401 errors - clear auth and redirect to login
const handleAuthError = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
      window.location.href = '/admin/login';
    }
  }
};

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  total_amount: number;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Ingredient {
  id: number;
  name: string;
  description: string;
  benefits: string[];
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    return response.json();
  },
  
  getUser: async (token: string): Promise<{ success: boolean; user: User }> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/user`, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      handleAuthError();
      throw new Error('Unauthorized');
    }
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },
  
  logout: async (token: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    // Clear local storage regardless of API response
    handleAuthError();
    if (!response.ok) throw new Error('Failed to logout');
    return response.json();
  },
};

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },
  
  getById: async (id: number): Promise<Product> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },
  
  create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },
  
  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },
  
  delete: async (id: number): Promise<void> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
  },
};

// Orders API
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },
  
  getById: async (id: number): Promise<Order> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },
  
  create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },
  
  update: async (id: number, order: Partial<Order>): Promise<Order> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to update order');
    return response.json();
  },
  
  delete: async (id: number): Promise<void> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete order');
  },
};

// Ingredients API
export const ingredientsApi = {
  getAll: async (): Promise<Ingredient[]> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/ingredients`);
    if (!response.ok) throw new Error('Failed to fetch ingredients');
    const data = await response.json();
    return data.map((ing: any) => ({
      ...ing,
      benefits: typeof ing.benefits === 'string' ? JSON.parse(ing.benefits) : ing.benefits,
    }));
  },
  
  getById: async (id: number): Promise<Ingredient> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/ingredients/${id}`);
    if (!response.ok) throw new Error('Failed to fetch ingredient');
    const data = await response.json();
    return {
      ...data,
      benefits: typeof data.benefits === 'string' ? JSON.parse(data.benefits) : data.benefits,
    };
  },
  
  create: async (ingredient: Omit<Ingredient, 'id' | 'created_at' | 'updated_at'>): Promise<Ingredient> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/ingredients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ingredient),
    });
    if (!response.ok) throw new Error('Failed to create ingredient');
    return response.json();
  },
  
  update: async (id: number, ingredient: Partial<Ingredient>): Promise<Ingredient> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/ingredients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ingredient),
    });
    if (!response.ok) throw new Error('Failed to update ingredient');
    return response.json();
  },
  
  delete: async (id: number): Promise<void> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/ingredients/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete ingredient');
  },
};

// Contact Messages API
export const contactMessagesApi = {
  getAll: async (): Promise<ContactMessage[]> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/contact-messages`);
    if (!response.ok) throw new Error('Failed to fetch contact messages');
    return response.json();
  },
  
  getById: async (id: number): Promise<ContactMessage> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/contact-messages/${id}`);
    if (!response.ok) throw new Error('Failed to fetch contact message');
    return response.json();
  },
  
  create: async (message: Omit<ContactMessage, 'id' | 'created_at' | 'updated_at'>): Promise<ContactMessage> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/contact-messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    if (!response.ok) throw new Error('Failed to create contact message');
    return response.json();
  },
  
  update: async (id: number, message: Partial<ContactMessage>): Promise<ContactMessage> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/contact-messages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    if (!response.ok) throw new Error('Failed to update contact message');
    return response.json();
  },
  
  delete: async (id: number): Promise<void> => {
    const response = await fetchWithRetry(`${API_BASE_URL}/contact-messages/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete contact message');
  },
};
