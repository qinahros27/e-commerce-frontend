import AddorEditProduct from "../../types/AddorEditProduct";
import ProductDetail from "../../types/ProductDetail";
import { category1, category2, category3 } from "./categories";

const product1: ProductDetail = {
    id: 1,
    title: "A  product",
    price: 100,
    description: "product 1",
    images: [],
    category: category1
}

const product2: ProductDetail = {
    id: 2,
    title: "B  product",
    price: 300,
    description: "product 2",
    images: [],
    category: category2
}

const product3: ProductDetail = {
    id: 3,
    title: "C  product",
    price: 200,
    description: "product 3",
    images: [],
    category: category3
}

const product4: ProductDetail = {
    id: 4,
    title: "D  product",
    price: 50,
    description: "product 4",
    images: [],
    category: category1
}

const newProduct: AddorEditProduct = {
    title: "E product",
    price: 500,
    description: "new product",
    images: [""],
    categoryId: 3
}

const invalidProduct: AddorEditProduct = {
    title: "E product",
    price: 0,
    description: "new product",
    images: [],
    categoryId: 5
}

const updateProduct: AddorEditProduct = {
    title: "E product",
    price: 10,
    description: "new product",
    images: [],
    categoryId: 5
}

export { product1, product2, product3, product4, newProduct, invalidProduct,updateProduct }