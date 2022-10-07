export interface ItemProps {
    id: string
    name: string
    price: number
    img: string | undefined
    type: "tea" | "coffee"
}
export interface Ingredients {
    doubleShot: boolean
    sugar: number
    honey: number
    milk: number
}
export interface OrderItem {
    id: number
    item: ItemProps
    ing: Ingredients
}
