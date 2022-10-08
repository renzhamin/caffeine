import PocketBase from "pocketbase"
import { OrderItem } from "../types"
import { calculateCost } from "./CostCalculations"

const client = new PocketBase("http://127.0.0.1:8080")

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
    const record = await client.records.create("orders", order)
    console.log(record)
}
