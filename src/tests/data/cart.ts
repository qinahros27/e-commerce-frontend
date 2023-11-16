import Cart from "../../types/Cart";

const cart1: Cart = {
    id: 1,
    product: {
        id: 1,
        title: "product1",
        price: 10,
        description: "des product1",
        category: 1,
        images: []
    },
    quantities: 1
}

const cart2: Cart = {
    id: 2,
    product: {
        id: 2,
        title: "product2",
        price: 20,
        description: "des product2",
        category: 2,
        images: []
    },
    quantities: 2
}

const cart3: Cart = {
    id: 3,
    product: {
        id: 3,
        title: "product1",
        price: 30,
        description: "des product1",
        category: 3,
        images: []
    },
    quantities: 3
}

export { cart1, cart2,cart3}