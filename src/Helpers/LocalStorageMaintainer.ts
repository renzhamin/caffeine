import { OrderItem } from "../types"

export function getOrderedItemsFromLS() {
    let prevOrderedItems = localStorage.getItem("totalOrderedItems")

    if (!prevOrderedItems) return null

    prevOrderedItems = JSON.parse(prevOrderedItems)

    if (!prevOrderedItems) return null

    let totalOrderedItems: OrderItem[] = []

    Object.assign(totalOrderedItems, prevOrderedItems)

    return totalOrderedItems
}

export function clearOrderedItemsFromLS() {
    localStorage.removeItem("totalOrderedItems")
}

export function setOrderedItemsInLS(OI: OrderItem[]) {
    localStorage.setItem("totalOrderedItems", JSON.stringify(OI))
}

export function getIsSouthHallFromLS() {
    let isSouthhall = localStorage.getItem("isSouthhall")

    if (isSouthhall === "1") return true

    return false
}

export function setIsSouthHallInLS(value: boolean) {
    let x = value ? "1" : "0"

    localStorage.setItem("isSouthhall", x)
}
