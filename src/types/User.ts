export default interface User {
    id?: number,
    email: string,
    password: string,
    name: string,
    role?: "customer" | "admin",
    avatar: string
}