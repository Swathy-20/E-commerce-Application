import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

export const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    const fetchResults = async () => {
      try{
      const res = await axiosInstance.get(`/product/productList?search=${searchQuery}`);
      console.log('API response:', res.data);

      if (Array.isArray(res.data)) {
        setProducts(res.data); // ✅ good to go
      } else if (res.data.products && Array.isArray(res.data.products)) {
        setProducts(res.data.products); // ✅ fallback if backend sends { products: [...] }
      } else {
        setProducts([]); // ❌ fallback
      }
      }catch(err){
        console.error('Fetch error:', err);
        setProducts([]);
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [searchQuery]);
  console.log('Search Query:', searchQuery);


  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      {Array.isArray(products) && products.length > 0 ? (
         products.map((product) => (
          <div key={product._id}>{product.name}</div>
         ))
        ) : (
  <p>No products found.</p>
      )}
    </div>
  );
  
}  


