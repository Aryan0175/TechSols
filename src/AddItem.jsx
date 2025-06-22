import React, { useRef, useState } from 'react';
import { ChevronDown, Upload, X } from 'lucide-react';
import { redirect, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function AddItem({ setItems }) {
    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);
    const navigate = useNavigate();

    const [coverImage, setCoverImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        email: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setCoverImage(URL.createObjectURL(file));
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files)
                .filter(file => file.type.startsWith('image/'))
                .map(file => URL.createObjectURL(file));

            setAdditionalImages((prev) => [...prev, ...newImages]);
        }
    };


    const handleImageClick = () => fileInputRef.current?.click();
    const handleCoverClick = () => coverInputRef.current?.click();

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files) {
            const newImages = Array.from(e.dataTransfer.files).filter(file =>
                file.type.startsWith('image/')
            );
            setAdditionalImages((prev) => [...prev, ...newImages]);
        }
    };

    const removeImage = (index) => {
        setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.type || !formData.description || !formData.email) {
            alert('All text fields are required, including email.');
            return;
        }

        if (!coverImage) {
            alert('Cover image is required.');
            return;
        }

        if (additionalImages.length < 1) {
            alert('At least one additional image is required.');
            return;
        }

        const newItem = {
            id: uuidv4(),
            ...formData,
            coverImage,
            additionalImages,
        };

        setItems((prev) => [newItem, ...prev]);

        alert('Form submitted!');

        setFormData({ name: '', type: '', email: '', description: '' });
        setCoverImage(null);
        setAdditionalImages([]);

        navigate('/view');
    };



    return (
        <div className="min-h-screen flex justify-center items-center w-full bg-gray-50 py-8 px-4">
            <div className=" mx-auto ">
                {/* <h1 className="text-2xl font-bold mb-6">Add Product</h1> */}

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-6">Add Product Details</h2>

                    <form onSubmit={handleSubmit}>

                        {/* Cover Image Upload */}
                        <div className="mb-6">
                            <input
                                type="file"
                                ref={coverInputRef}
                                onChange={handleCoverImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                                onClick={handleCoverClick}
                            >
                                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-gray-600">
                                    {coverImage ? "Cover image selected" : "Click to upload Cover Image (required)"}
                                </p>
                            </div>
                            {coverImage && (
                                <img
                                    src={coverImage}
                                    alt="Cover Preview"
                                    className="mt-4 w-full h-32 object-cover rounded-lg"
                                />
                            )}
                        </div>

                        {/* Text Inputs */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="">Select type</option>
                                    <option value="Shirt">Shirt</option>
                                    <option value="Pant">Pant</option>
                                    <option value="Shoes">Shoes</option>
                                    <option value="Sports Gear">Sports Gear</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Additional Images Upload */}
                        <div className="mt-6 mb-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                multiple
                                accept="image/*"
                            />
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                                onClick={handleImageClick}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-gray-600">Click or drag to upload additional images (min 1)</p>
                            </div>

                            {additionalImages.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {additionalImages.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={image}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save and Add Another
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
