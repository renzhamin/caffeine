import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { calculateCost, getTotalCost } from "../Helpers/CostCalculations"
import { createOrder } from "../Helpers/CreateOrder"
import {
    getIsSouthHallFromLS,
    setIsSouthHallInLS,
    setOrderedItemsInLS,
} from "../Helpers/LocalStorageMaintainer"
import { OrderItem } from "../types"
import { ModalGeneric } from "./ModalGeneric"
import { ModalYesNo } from "./ModalYesNo"

function DisplayOrderItem(order: OrderItem) {
    const { name, img, price } = order.item
    const { ing } = order
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
                {ing.sugar > 0 && <p>Sugar : {ing.sugar}</p>}
                {ing.milk > 0 && <p>Milk : {ing.milk}</p>}
                {ing.honey > 0 && <p>Honey : {ing.honey}</p>}
                {ing.doubleShot == true && <p>DoubleShot</p>}
                <p className="subtittle is-4"> Cost : {cost}</p>
            </div>
        </React.Fragment>
    )
}

function ConfirmOrder({
    cost,
    room,
    setRoom,
    isSouthHall,
    setIsSouthHall,
    confirmOrder,
    yourName,
    setYourName,
}: {
    cost: number
    isSouthHall: boolean
    setIsSouthHall: any
    confirmOrder(): void
    room: string
    setRoom(room: string): any
    yourName: string
    setYourName(name: string): void
}) {
    const [isClearItemModalActive, setIsClearItemModalActive] = useState(false)
    const [isConfirmOrderModalActive, setIsConfirmOrderModalActive] =
        useState(false)
    const { setTotalOrderedItems } = useContext(AppContext)

    return (
        <div className="card">
            <ModalYesNo
                isActive={isConfirmOrderModalActive}
                setIsActive={setIsConfirmOrderModalActive}
                onYes={() => {
                    confirmOrder()
                    setIsConfirmOrderModalActive(false)
                }}
                yesIsGood={true}
                onNo={() => setIsConfirmOrderModalActive(false)}
                text={`Confirm order for ${yourName} in room ${room} ${
                    isSouthHall ? "South" : "North"
                }`}
            />

            <ModalYesNo
                isActive={isClearItemModalActive}
                setIsActive={setIsClearItemModalActive}
                yesIsGood={false}
                onYes={() => {
                    setTotalOrderedItems([])
                    setIsClearItemModalActive(false)
                }}
                onNo={() => setIsClearItemModalActive(false)}
                text={"Are you sure ? "}
            />

            <form id="checkout-form">
                <div className="card-content">
                    <div className="mb-3">
                        <span>Room No : </span>
                        <input
                            required={true}
                            autoFocus
                            type="number"
                            id="room"
                            value={room}
                            onChange={(e) => {
                                setRoom(e.currentTarget.value)
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <span>Your Name : </span>
                        <input
                            required={true}
                            type="text"
                            id="room-input"
                            value={yourName}
                            onChange={(e) => {
                                setYourName(e.currentTarget.value)
                            }}
                        />
                    </div>
                    <div className="tabs is-toggle">
                        <ul>
                            <li
                                className={
                                    isSouthHall === false ? "is-active" : ""
                                }
                                onClick={() => setIsSouthHall(false)}
                            >
                                <a>
                                    <span>North</span>
                                </a>
                            </li>

                            <li
                                className={
                                    isSouthHall === true ? "is-active" : ""
                                }
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
                            type="submit"
                            className="button is-success mt-3"
                            disabled={cost === 0}
                            onClick={(e) => {
                                e.preventDefault()
                                if (room == "" || yourName == "") {
                                    const x: HTMLFormElement | null =
                                        document.querySelector("#checkout-form")
                                    x?.reportValidity()
                                    return
                                }
                                setIsConfirmOrderModalActive(true)
                            }}
                        >
                            Confirm Order
                        </button>
                        {cost > 0 && (
                            <button
                                className="button is-danger is-pulled-right mt-3"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsClearItemModalActive(true)
                                }}
                            >
                                Remove All
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export function CheckOut() {
    const { totalOrderedItems, setTotalOrderedItems } = useContext(AppContext)

    const [isSouthHall, setIsSouthHall] = useState(getIsSouthHallFromLS())
    const [room, setRoom] = useState(localStorage.getItem("room") || "400")
    const [yourName, setYourName] = useState(localStorage.getItem("name") || "")

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

    useEffect(() => {
        localStorage.setItem("name", yourName)
        localStorage.setItem("room", room)
    }, [room, yourName])

    const confirmOrder = async () => {
        for (let oi of totalOrderedItems) {
            await createOrder(yourName, oi, room, isSouthHall)
        }
        setTotalOrderedItems([])
    }

    return (
        <div className="container">
            <div className="mb-6">
                <ConfirmOrder
                    yourName={yourName}
                    setYourName={setYourName}
                    room={room}
                    setRoom={setRoom}
                    confirmOrder={confirmOrder}
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
