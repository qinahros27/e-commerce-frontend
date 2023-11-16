import User from "../../types/User";

const user1: User = {
    id: 1,
    email: "john@mail.com",
    name: "john",
    password: "john",
    avatar: "",
    role: "admin"
}

const user2: User = {
    id: 2,
    email: "sabrina@mail.com",
    name: "sabrina",
    password: "sabrina",
    avatar: "",
    role: "customer"
}

const user3: User = {
    id: 3,
    email: "cina@mail.com",
    name: "cina",
    password: "cina",
    avatar: "",
    role: "admin"
}

const user4: User = {
    id: 4,
    email: "alina@mail.com",
    name: "alina",
    password: "alina",
    avatar: "",
    role: "customer"
}

const newUser: User = {
    email: "ali@mail.com",
    name: "ali",
    password: "ali",
    avatar: "",
    role: "customer"
}

const updateUser: User = {
    email: "lia@mail.com",
    name: "lia",
    password: "lia",
    avatar: "",
    role: "customer"
}

export {user1, user2, user3, user4,newUser,updateUser}