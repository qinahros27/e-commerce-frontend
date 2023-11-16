import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { category1,category2,category3} from '../data/categories';
import Category from '../../types/Category';

const categoryServer = setupServer(
    rest.get("https://api.escuelajs.co/api/v1/categories", (req, res, ctx) => {
        return res(
            ctx.json([category1,category2,category3])
        )
    }),
    rest.get('https://api.escuelajs.co/api/v1/categories/:id', (req, res, ctx) => {
        const { id } = req.params;
        if (category1.id === parseInt(id as string)) {
            return res(ctx.json(category1));
        }
        else if (category2.id === parseInt(id as string)) {
            return res(ctx.json(category2));
        }
        else if (category3.id === parseInt(id as string)) {
            return res(ctx.json(category3));
        }
    }),
    rest.post("https://api.escuelajs.co/api/v1/categories/", async (req, res, ctx) => {
        const newCategory = await req.json() as Category;
        let category: Category|null = null;
        category = {
            name: newCategory.name,
            image: ""
            }
        
        return res(
            ctx.status(201),
            ctx.json(category)
        )
    }),
    rest.put(`https://api.escuelajs.co/api/v1/categories/:id`, async (req, res, ctx) => {
        const updateCategory = await req.json() as Category
        let category: Category|null = null
        const { id } = req.params;

        category = {
            name: updateCategory.name,
            image: updateCategory.image,
            id: parseInt(id as string)
        }
        if (category1.id === parseInt(id as string) || category2.id === parseInt(id as string) || category3.id === parseInt(id as string)) {
            return res(ctx.json(category));
        }
    }),
    rest.delete('https://api.escuelajs.co/api/v1/categories/:id', (req, res, ctx) => {
        const { id } = req.params;
        if (category1.id === parseInt(id as string) || category2.id === parseInt(id as string) || category3.id === parseInt(id as string) ) {
            return res(ctx.json(true));
        }
        else return res(ctx.json(false));
    }),
)

export default categoryServer