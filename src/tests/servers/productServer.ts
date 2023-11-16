import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { product1, product2, product3, product4 } from '../data/products';
import categories from '../data/categories';
import ProductDetail from '../../types/ProductDetail';
import AddorEditProduct from '../../types/AddorEditProduct';
import Category from '../../types/Category';

const productServer = setupServer(
    rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
        return res(
            ctx.json([product1, product2, product3, product4])
        )
    }),
    rest.get('https://api.escuelajs.co/api/v1/products/:id', (req, res, ctx) => {
        const { id } = req.params;
        if (product1.id === parseInt(id as string)) {
            return res(ctx.json(product1));
        }
        else if (product2.id === parseInt(id as string)) {
            return res(ctx.json(product2));
        }
        else if (product3.id === parseInt(id as string)) {
            return res(ctx.json(product3));
        }
        else if (product4.id === parseInt(id as string)) {
            return res(ctx.json(product4));
        }
    }),
    rest.post("https://api.escuelajs.co/api/v1/products/", async (req, res, ctx) => {
        const newProduct = await req.json() as AddorEditProduct;
        const category = categories.find(c => c.id === newProduct.categoryId);
        const error: string[] = [];
        let product: ProductDetail|null = null;
        if (!(newProduct.price > 0)) {
            error.push("price must be a positive number");
        }
        if (!Array.isArray(newProduct.images)) {
            error.push("images must be an array");
        } else if (newProduct.images.length < 1) {
            error.push("images must contain at least 1 image");
        } else if (newProduct.images.some(item => typeof item !== "string")) {
            error.push("images must be an array of string");
        }
        if (!category) {
            error.push("category does not exist");
        } else {
            product = {
                title: newProduct.title,
                price: newProduct.price,
                category: category,
                description: newProduct.description,
                images: newProduct.images,
                id: 1
            }
        }
        if (error.length > 0) {
            return res(
                ctx.status(400),
                ctx.json({
                    statusCode: 400,
                    message: error,
                    error: "Bad Request"
                })
            )
        }
        return res(
            ctx.status(201),
            ctx.json(product)
        )
    }),
    rest.put(`https://api.escuelajs.co/api/v1/products/:id`, async (req, res, ctx) => {
        const updateProduct = await req.json() as AddorEditProduct
        let product: ProductDetail|null = null
        const category = categories.find(c => c.id === updateProduct.categoryId)
        const { id } = req.params;

        product = {
            title: updateProduct.title,
            price: updateProduct.price,
            category: category as Category,
            description: updateProduct.description,
            images: updateProduct.images,
            id: parseInt(id as string)
        }
        if (product1.id === parseInt(id as string) || product2.id === parseInt(id as string) || product3.id === parseInt(id as string) || product4.id === parseInt(id as string)) {
            return res(ctx.json(product));
        }
    }),
    rest.delete('https://api.escuelajs.co/api/v1/products/:id', (req, res, ctx) => {
        const { id } = req.params;
        if (product1.id === parseInt(id as string) || product2.id === parseInt(id as string) || product3.id === parseInt(id as string) ||  product4.id === parseInt(id as string)) {
            return res(ctx.json(true));
        }
        else return res(ctx.json(false));
    }),
)

export default productServer