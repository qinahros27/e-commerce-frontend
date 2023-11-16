import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { user1, user2, user3, user4 } from '../data/users';
import User from '../../types/User';

const userServer = setupServer(
    rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
        return res(
            ctx.json([user1, user2, user3, user4]),
        )
    }),
    rest.get('https://api.escuelajs.co/api/v1/users/:id', (req, res, ctx) => {
        const { id } = req.params;
        if (user1.id === parseInt(id as string)) {
            return res(ctx.json(user1));
        }
        else if (user2.id === parseInt(id as string)) {
            return res(ctx.json(user2));
        }
        else if (user3.id === parseInt(id as string)) {
            return res(ctx.json(user3));
        }
        else if (user4.id === parseInt(id as string)) {
            return res(ctx.json(user4));
        }
    }),
    rest.post("https://api.escuelajs.co/api/v1/users/", async (req, res, ctx) => {
        const newUser = await req.json() as User;
        let user: User|null = null;
        user = {
            email: newUser.email,
            name: newUser.name,
            password: newUser.password,
            avatar: "",
            role: "customer"
            }
        
        return res(
            ctx.status(201),
            ctx.json(user)
        )
    }),
    rest.put("https://api.escuelajs.co/api/v1/users/:id", async (req, res, ctx) => {
        const updateUser = await req.json() as User;
        const { id } = req.params;
        let user: User|null = null;
        user = {
            email: updateUser.email,
            name: updateUser.name,
            password: updateUser.password,
            avatar: "",
            role: "customer",
            id: parseInt(id as string)
        }
        if (user1.id === parseInt(id as string) || user2.id === parseInt(id as string) || user3.id === parseInt(id as string) || user4.id === parseInt(id as string)) {
            return res(ctx.json(user));
        }
    })
)

export default userServer