import React, { useContext, useEffect, useState } from "react"
import { Ingredients, ItemProps } from "../types"
import { AppContext } from "../App"
import { ingredientPrices, calculateCost } from "../Helpers/CostCalculations"
import { useParams } from "react-router"
import { ButtonsArray } from "./ButtonsArray"
import { Link } from "react-router-dom"
import { ModalGeneric } from "./ModalGeneric"
import { setOrderedItemsInLS } from "../Helpers/LocalStorageMaintainer"

const defaultIng: Ingredients = {
    doubleShot: false,
    sugar: 1,
    milk: 1,
    honey: 0,
}

function generateUUID() {
    const rnd = Math.random()
    const unix_time = Date.now()
    const id: number = rnd * unix_time
    return id
}

export function Item() {
    let { totalOrderedItems, setTotalOrderedItems, totalItems } =
        useContext(AppContext)
    let { id } = useParams()

    const props = totalItems.filter((item) => item.id == id)[0]

    const { name, price, img } = props
    const [ing, setIng] = useState(defaultIng)
    const [cost, setCost] = useState(price + ingredientPrices.sugar)

    const [isModalActive, setIsModalActive] = useState(false)

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name
        const value = parseInt(e.currentTarget.value)
        setIng({ ...ing, [name]: value })
    }

    const setIngValue = (name: string) => {
        return (value: number) => {
            setIng({ ...ing, [name]: value })
        }
    }

    const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIng(defaultIng)
        const newOrderItem = { id: generateUUID(), item: props, ing }
        setTotalOrderedItems([...totalOrderedItems, newOrderItem])
        setIsModalActive(true)
        setOrderedItemsInLS(totalOrderedItems)
    }

    useEffect(() => {
        setCost(calculateCost(price, ing))
    }, [ing])

    return (
        <div className="container">
            <ModalGeneric
                isActive={isModalActive}
                setIsActive={setIsModalActive}
            >
                <div>Successfully added item</div>
                <div className="mt-3">
                    <Link to="/" className="button is-success">
                        Add Other Items
                    </Link>
                    <Link to="/checkout" className="button is-danger ml-4">
                        Checkout
                    </Link>
                </div>
            </ModalGeneric>
            <div className="card">
                <div className="card-header">
                    <div className="card-header-title ml-4"> {name}</div>
                </div>
                <div className="ml-5 mt-4">
                    <img width={"200px"} src={img} alt={name} />
                    <div>Price : {price}</div>
                </div>
                <div className="card-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-header-title">
                                Quantity in Tea Spoons
                            </div>
                        </div>
                        <div className="card-content">
                            <ButtonsArray
                                name="Milk"
                                min={0}
                                max={3}
                                value={ing.milk}
                                setValue={setIngValue("milk")}
                            />

                            <ButtonsArray
                                name="Sugar"
                                min={0}
                                max={3}
                                value={ing.sugar}
                                setValue={setIngValue("sugar")}
                            />

                            <ButtonsArray
                                name="Honey"
                                min={0}
                                max={3}
                                value={ing.honey}
                                setValue={setIngValue("honey")}
                            />
                        </div>
                    </div>
                    <div className="mt-3 tabs is-toggle">
                        <ul>
                            <li
                                className={
                                    ing.doubleShot == false ? "is-active" : ""
                                }
                                onClick={() =>
                                    setIng({
                                        ...ing,
                                        doubleShot: false,
                                    })
                                }
                            >
                                <a>
                                    <span>Single Shot</span>
                                </a>
                            </li>

                            <li
                                className={
                                    ing.doubleShot == true ? "is-active" : ""
                                }
                                onClick={() =>
                                    setIng({ ...ing, doubleShot: true })
                                }
                            >
                                <a>
                                    <span>Double Shot</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="is-size-5 block"> Net Cost : {cost}</div>
                </div>
                <div className="card-footer mb-6">
                    <button
                        className="card-footer-item button is-success "
                        type="submit"
                        onClick={onSubmit}
                    >
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
