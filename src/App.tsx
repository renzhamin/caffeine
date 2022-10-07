import React, { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import tea_raw from "./Images/tea-raw.jpg"
import coffee from "./Images/coffee.jpg"
import { Item } from "./Components/Item"
import { NavBar } from "./Components/NavBar"
import { OrderItem, ItemProps } from "./types"
import { CheckOut } from "./Components/CheckOut"
import { Home } from "./Components/Home"
import { getOrderedItemsFromLS } from "./Helpers/LocalStorageMaintainer"

interface ContextState {
    totalOrderedItems: OrderItem[]
    setTotalOrderedItems(items: OrderItem[]): void
    totalItems: ItemProps[]
}

export const AppContext = React.createContext({} as ContextState)

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

function App() {
    const [totalOrderedItems, setTotalOrderedItems] = useState<OrderItem[]>(
        getOrderedItemsFromLS() || []
    )
    const totalItems: ItemProps[] = [TeaObj, CoffeObj]

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
