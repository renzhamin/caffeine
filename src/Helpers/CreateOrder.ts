import PocketBase from "pocketbase"
import { OrderItem } from "../types"
import { calculateCost } from "./CostCalculations"

let url = "https://caffeine.fly.dev"

if (process.env.NODE_ENV === "development") {
    url = "http://localhost:8080"
}

const client = new PocketBase(url)

export async function createOrder(
    name: string,
    oi: OrderItem,
    room: string,
    isSouthHall: boolean
) {
    const order = {
        name,
        item: oi.item.name,
        ing: oi.ing,
        room: room + (isSouthHall ? "S" : "N"),
        cost: calculateCost(oi.item.price, oi.ing),
    }
    const record = await client.records.create("orders", order).catch((err) => {
        return err
    })
    return record
}
