import axios from "axios";
import { Product } from "../types/product";

const host = "http://localhost:8080/product";
// const host = "https://vocal-loutitia-fontys-8d77c0a6.koyeb.app/product";

async function getProducts(page :number ) {
    try {
        const response = await axios.get(host+"?page=" + page);
        console.log("Products fetched successfully:", response.data);
        return response.data.products;
    }
    catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

async function getProductById(id: number) {
    try {
        const response = await axios.get(`${host}/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
    }   
}
async function createProduct(product: Product) {
    const response = await axios.post(host, product);
    return response.data;
}

async function updateProduct(product: Product) {
    try {
        const response = await axios.put(`${host}`, product);
        return response.data;
    }
    catch (error) {
        console.error(`Error updating product with ID ${product.id}:`, error);
        throw error;
    }   
}

async function deleteProduct(id: number) {
    try {
        const response = await axios.delete(`${host}/${id}`);
        return response.data;
    }
    catch (error) { 
        console.error(`Error deleting product with ID ${id}:`, error);
        throw error;
    }
}

const ProductService = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

export default ProductService;