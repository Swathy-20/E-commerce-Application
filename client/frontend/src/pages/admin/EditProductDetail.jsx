import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

export const EditProductDetail = () => {
  const { id } = useParams();
  //console.log("Product ID:", id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productId: '',  
    name: '',
    price: '',
    description: '',
    category: '',
    stock:'',
    brand:'',
    ratings:'',
    returnPolicy:'',

  });
  const [sizes, setSizes] = useState([""]);
  const [colors, setColors] = useState([""]);
  const [specifications, setSpecifications] = useState({ material: '', weight: '' });
  const [images, setImages] = useState([]); // For preview
  const [newImages, setNewImages] = useState([]); // For upload
  const [originalData, setOriginalData] = useState(null); 
  
  // Fetch existing data
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const res = await axiosInstance.get(`/product-detail/detailbyId/${id}`);
        const detail= res.data;

        setFormData({
          productId: detail.productId || '',
          name: detail.name || '',
          price: detail.price || '',
          description: detail.description || '',
          category: detail.category || '',
          brand: detail.brand || '',
          ratings: detail.ratings || '',
          stock: detail.stock || '',
          returnPolicy:detail.returnPolicy || ''
        });

        setSizes(detail.sizes || [""]);
        setColors(detail.colors || [""]);
        setSpecifications({
          material: detail.specifications?.material || '',
          weight: detail.specifications?.weight || ''
        });
        setImages(detail.images || []);
        setOriginalData(detail);
      } catch (err) {
        console.error("Error loading data", err);
        toast.error("Failed to fetch product details");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSizeChange = (i, value) => {
    const updated = [...sizes];
    updated[i] = value;
    setSizes(updated);
  };
  const handleColorChange = (i, value) => {
    const updated = [...colors];
    updated[i] = value;
    setColors(updated);
  };
  const handleAddField = (type) => {
    if (type === 'sizes') setSizes([...sizes, '']);
    if (type === 'colors') setColors([...colors, '']);
  };

  const handleSpecificationChange = (key, value) => {
    setSpecifications((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append("specifications[material]", specifications.material);
    data.append("specifications[weight]", specifications.weight);

    newImages.forEach((img) => data.append("images", img));
    sizes.forEach((size) => data.append("sizes", size));
    colors.forEach((color) => data.append("colors", color));
    // for (const key in specifications) {
    //   data.append(`specifications[${key}]`, specifications[key]);
    // }


    try {
      const res = await axiosInstance.put(`/product-detail/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      

      if (res.status === 200) {
        toast.success(res.data.message || "Product updated!");
        navigate('/admin/product');
      } 
    } catch (err) {
      console.error("Update failed", err);
      toast.error( "Error while uploading");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full md:w-2/3 space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold">Edit Product</h2>

        {[
          "productId",
          "name",
          "description",
          "price",
          "category",
          "brand",
          "stock",
          "ratings",
          "returnPolicy"
        ].map((field) => (
          <div key={field}>
            <label className="block font-medium mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        {/* Sizes */}
        <div>
          <label className="block font-medium mb-1">Sizes</label>
          {sizes.map((size, i) => (
            <input
              key={i}
              type="text"
              value={size}
              onChange={(e) => handleSizeChange(i, e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
          ))}
          <button type="button" onClick={() => handleAddField("sizes")} className="text-blue-600 text-sm">+ Add Size</button>
        </div>

        {/* Colors */}
        <div>
          <label className="block font-medium mb-1">Colors</label>
          {colors.map((color, i) => (
            <input
              key={i}
              type="text"
              value={color}
              onChange={(e) => handleColorChange(i, e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
          ))}
          <button type="button" onClick={() => handleAddField("colors")} className="text-blue-600 text-sm">+ Add Color</button>
        </div>

        {/* Specifications */}
        <div>
          <label className="block font-medium mb-1">Specifications</label>
          <input
            type="text"
            placeholder="Material"
            value={specifications.material}
            onChange={(e) => handleSpecificationChange("material", e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Weight"
            value={specifications.weight}
            onChange={(e) => handleSpecificationChange("weight", e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Product Images</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-700"
          />
        </div>

        {/* Preview Current Images */}
        <div className="flex gap-2 mt-2">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`product-${index}`} className="w-20 h-20 object-cover rounded" />
          ))}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>

      {/* Product Preview */}
      {originalData && (
        <div className="bg-white p-6 rounded shadow-md w-full md:w-1/3 max-h-[200vh] overflow-y-auto">

          <img src={originalData.images?.[0]} alt="preview" className="w-full h-100 object-cover mb-4" />
          <h3 className="text-xl font-semibold">{originalData.name}</h3>
          <p className="text-lg text-gray-700">${originalData.price}</p>
          <p className="text-gray-600 mt-2">{originalData.description}</p>
          <p className="text-sm text-gray-500 mt-1">Category: {originalData.category}</p>
          <p className="text-sm text-gray-500">Brand: {originalData.brand}</p>
        </div>
      )}
    </div>
  );
};

