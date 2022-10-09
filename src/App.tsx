import React, { useState } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"

import { CheckOut } from "./Components/CheckOut"
import { Home } from "./Components/Home"
import { Item } from "./Components/Item"
import { NavBar } from "./Components/NavBar"
import { getOrderedItemsFromLS } from "./Helpers/LocalStorageMaintainer"
import coffee from "./Images/coffee.jpg"
import tea_raw from "./Images/tea-raw.jpg"
import { ItemProps, OrderItem } from "./types"

import { ToastContainer } from "react-toastify"

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
                <ToastContainer autoClose={2000} hideProgressBar={true} />
                <HashRouter>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/item/:id" element={<Item />} />
                        <Route path="/checkout" element={<CheckOut />} />
                    </Routes>
                </HashRouter>
            </div>
        </AppContext.Provider>
    )
}

export default App
