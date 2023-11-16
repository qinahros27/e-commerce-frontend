import Category from "./Category";

export default interface ProductDetail {
    id?: number
    title: string
    price: number
    description: string
    category: Category;
    images: string[]
}