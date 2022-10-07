import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { calculateCost, getTotalCost } from "../Helpers/CostCalculations"
import {
    getIsSouthHallFromLS,
    setIsSouthHallInLS,
    setOrderedItemsInLS,
} from "../Helpers/LocalStorageMaintainer"
import { OrderItem } from "../types"
import { ModalGeneric } from "./ModalGeneric"

function DisplayOrderItem(order: OrderItem) {
    const { name, img, price } = order.item
    const cost = calculateCost(price, order.ing)

    return (
        <React.Fragment>
            <div className="card-image">
                <figure className="image is-128x128">
                    <img src={img} alt={name} />
                </figure>
            </div>

            <div className="card-content">
                <p className="tittle is-4">{name}</p>
                <p className="subtittle is-4"> Cost : {cost}</p>
            </div>
        </React.Fragment>
    )
}

function ConfirmOrder({
    cost,
    isSouthHall,
    setIsSouthHall,
}: {
    cost: number
    isSouthHall: boolean
    setIsSouthHall: any
}) {
    const [room, setRoom] = useState("400")
    const [isModalActive, setIsModalActive] = useState(false)
    const { setTotalOrderedItems } = useContext(AppContext)

    return (
        <div className="card">
            <ModalGeneric
                isActive={isModalActive}
                setIsActive={setIsModalActive}
            >
                <div>Are you sure ?</div>
                <div className="mt-3">
                    <button
                        className="button is-danger"
                        onClick={() => {
                            setTotalOrderedItems([])
                            setIsModalActive(false)
                        }}
                    >
                        Yes
                    </button>
                    <button
                        className="button is-success ml-4"
                        onClick={() => setIsModalActive(false)}
                    >
                        No
                    </button>
                </div>
            </ModalGeneric>
            <div className="card-content">
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

                <div className="tabs is-toggle">
                    <ul>
                        <li
                            className={isSouthHall === false ? "is-active" : ""}
                            onClick={() => setIsSouthHall(false)}
                        >
                            <a>
                                <span>North</span>
                            </a>
                        </li>

                        <li
                            className={isSouthHall === true ? "is-active" : ""}
                            onClick={() => setIsSouthHall(true)}
                        >
                            <a>
                                <span>South</span>
                            </a>
                        </li>
                    </ul>
                </div>
                {cost > 0 && (
                    <div>
                        <div>
                            Delivery Charge : {5 + Number(isSouthHall) * 5}
                        </div>
                        <div>Total Cost : {cost}</div>
                    </div>
                )}
                <div>
                    <button
                        className="button is-success mt-3"
                        disabled={cost === 0}
                    >
                        Confirm Order
                    </button>
                    {cost > 0 && (
                        <button
                            className="button is-danger is-pulled-right mt-3"
                            onClick={() => setIsModalActive(true)}
                        >
                            Remove All
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export function CheckOut() {
    const { totalOrderedItems, setTotalOrderedItems } = useContext(AppContext)

    const [isSouthHall, setIsSouthHall] = useState(getIsSouthHallFromLS())
    const [cost, setCost] = useState(
        getTotalCost(totalOrderedItems, isSouthHall)
    )

    const removeItem = (id: number) => {
        setTotalOrderedItems(
            totalOrderedItems.filter((order) => order.id !== id)
        )
    }

    useEffect(() => {
        setCost(getTotalCost(totalOrderedItems, isSouthHall))
        setOrderedItemsInLS(totalOrderedItems)
        setIsSouthHallInLS(isSouthHall)
    }, [totalOrderedItems, isSouthHall])

    return (
        <div className="container">
            <div className="mb-6">
                <ConfirmOrder
                    cost={cost}
                    isSouthHall={isSouthHall}
                    setIsSouthHall={setIsSouthHall}
                />
            </div>
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
