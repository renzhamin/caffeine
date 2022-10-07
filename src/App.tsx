import React, { useState } from "react"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"

import tea_raw from "./Images/tea-raw.jpg"
import coffee from "./Images/coffee.jpg"
import { Item } from "./Components/Item"
import { NavBar } from "./Components/NavBar"
import { OrderItem, Ingredients, ItemProps } from "./types"
import { CheckOut } from "./CheckOut"

interface ContextState {
    totalOrderedItems: OrderItem[]
    setTotalOrderedItems(items: OrderItem[]): void
    totalItems: ItemProps[]
}

export const AppContext = React.createContext({} as ContextState)

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

const TeaObj: ItemProps = {
    id: "1",
    name: "Tea",
    price: 10,
    img: tea_raw,
    type: "tea",
}
const CoffeObj: ItemProps = {
    id: "2",
    name: "Coffee",
    price: 10,
    img: coffee,
    type: "coffee",
}

const totalItems: ItemProps[] = [TeaObj, CoffeObj]

function DisplayItem(item: ItemProps) {
    const { name, img, price } = item

    return (
        <Link className="column is-4" to={"/item/" + item.id}>
            <div className="card">
                <div className="card-image">
                    <figure className="image is-128x128">
                        <img src={img} />
                    </figure>
                </div>

                <div className="media-content">
                    <p className="tittle is-4">{name}</p>
                    <p className="subtittle is-4">Price : {price}</p>
                </div>
            </div>
        </Link>
    )
}

function Home() {
    return (
        <div className="container mx-5">
            <div className="columns is-multiline">
                {totalItems.map((item, index) => {
                    return <DisplayItem key={index} {...item} />
                })}
            </div>
        </div>
    )
}

export function getTotalCost(totalOrderedItems: OrderItem[]) {
    let totalCost = 0
    for (let order of totalOrderedItems) {
        totalCost += calculateCost(order.item.price, order.ing)
    }

    return totalCost
}

function App() {
    const [totalOrderedItems, setTotalOrderedItems] = useState<OrderItem[]>([])

    return (
        <AppContext.Provider
            value={{ totalOrderedItems, setTotalOrderedItems, totalItems }}
        >
            <div>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/item/:id" element={<Item />} />
                        <Route path="/checkout" element={<CheckOut />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </AppContext.Provider>
    )
}

export default App
