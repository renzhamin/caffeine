import React, { useContext, useEffect, useState } from "react"
import { OrderItem } from "./types"
import { calculateCost, AppContext, getTotalCost } from "./App"

function DisplayOrderItem(order: OrderItem) {
    const { name, img, price } = order.item
    const cost = calculateCost(price, order.ing)

    return (
        <React.Fragment>
            <div className="card-image">
                <figure className="image is-128x128">
                    <img src={img} />
                </figure>
            </div>

            <div className="card-content">
                <p className="tittle is-4">{name}</p>
                <p className="subtittle is-4"> Cost : {cost}</p>
            </div>
        </React.Fragment>
    )
}

function ConfirmOrder() {
    const [room, setRoom] = useState("400")
    const [hall, setHall] = useState(true)
    return (
        <div className="card mb-6">
            <div className="mb-3">
                <span>Room No : </span>
                <input
                    autoFocus
                    type="text"
                    id="room"
                    value={room}
                    onChange={(e) => {
                        setRoom(e.currentTarget.value)
                    }}
                />
            </div>

            <div className="tabs is-toggle mb-6">
                <ul>
                    <li
                        className={hall == false ? "is-active" : ""}
                        onClick={() => setHall(false)}
                    >
                        <a>
                            <span>South</span>
                        </a>
                    </li>

                    <li
                        className={hall == true ? "is-active" : ""}
                        onClick={() => setHall(true)}
                    >
                        <a>
                            <span>North</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="card-footer">
                <button className="button is-success">Confirm Order</button>
            </div>
        </div>
    )
}

export function CheckOut() {
    const { totalOrderedItems, setTotalOrderedItems } = useContext(AppContext)
    const [cost, setCost] = useState(getTotalCost(totalOrderedItems))

    const removeItem = (id: number) => {
        setTotalOrderedItems(
            totalOrderedItems.filter((order) => order.id !== id)
        )
    }

    useEffect(() => {
        setCost(getTotalCost(totalOrderedItems))
    }, [totalOrderedItems])

    return (
        <div className="container">
            <ConfirmOrder />
            <div className="columns is-multiline">
                {totalOrderedItems.map((order, index) => {
                    return (
                        <div key={order.id} className="column is-4">
                            <div className="card">
                                <DisplayOrderItem {...order} />
                                <div className="card-footer is-justify-content-flex-end ">
                                    <button
                                        className="button is-danger"
                                        onClick={() => removeItem(order.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
