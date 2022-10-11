import { OrderItem, Ingredients } from "../types"

export const ingredientPrices = {
    sugar: 2,
    milk: 3,
    honey: 5,
}

export function calculateCost(price: number, ing: Ingredients) {
    return (
        price +
        Number(ing.doubleShot) * price +
        ingredientPrices.sugar * ing.sugar +
        ingredientPrices.milk * ing.milk +
        ingredientPrices.honey * ing.honey
    )
}

export function getTotalCost(
    totalOrderedItems: OrderItem[],
    isSouthHall = false
) {
    if (totalOrderedItems.length === 0) return 0

    let totalCost = 0
    for (const order of totalOrderedItems) {
        totalCost += calculateCost(order.item.price, order.ing)
    }

    if (isSouthHall) totalCost += 5

    return totalCost + 5
}
