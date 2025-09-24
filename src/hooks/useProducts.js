// hooks/useProducts.js
import { useState, useEffect } from 'react';
import ApiService from '../services/api';

export const useProducts = (category = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ApiService.getProducts(category);
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getProducts(category);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error refetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ApiService.getProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
