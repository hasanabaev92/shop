export type ProductT = {
    id: string;
    name: string;
    price: number;
    lost: number
}

export type ProductListT = ProductT[]

export type ProductCartT = ProductT & {
    orderCount: number
}
