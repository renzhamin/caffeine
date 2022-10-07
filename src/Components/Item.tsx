import React, { useContext, useEffect, useState } from "react"
import { Ingredients, ItemProps } from "../types"
import { ingredientPrices, AppContext, calculateCost } from "../App"
import { useParams } from "react-router"

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

function IngQuant({
    name,
    min,
    max,
    value,
    setValue,
}: {
    name: string
    min: number
    max: number
    value: number
    setValue(n: number): void
}) {
    let arr: number[] = []
    for (let i = min; i <= max; i++) {
        arr.push(i)
    }

    const handleChange = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const curValue = parseInt(e.currentTarget.name)
        if (curValue !== value) setValue(curValue)
    }

    return (
        <div className="columns is-mobile is-vcentered">
            <span className="column is-2">{name} </span>
            <span className="column">
                {arr.map((n) => {
                    return (
                        <button
                            key={n}
                            name={String(n)}
                            className={
                                "button " +
                                (n === value && " is-selected is-primary")
                            }
                            onClick={handleChange}
                        >
                            {n}
                        </button>
                    )
                })}
            </span>
        </div>
    )
}

export function Item() {
    let { totalOrderedItems, setTotalOrderedItems, totalItems } =
        useContext(AppContext)
    let { id } = useParams()

    const props = totalItems.filter((item) => item.id == id)[0]

    const { name, price, img } = props
    const [ing, setIng] = useState(defaultIng)
    const [cost, setCost] = useState(price + ingredientPrices.sugar)

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

    const setMilkValue = (value: number) => {
        setIng({ ...ing, milk: value })
    }

    const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIng(defaultIng)
        const newOrderItem = { id: generateUUID(), item: props, ing }
        setTotalOrderedItems([...totalOrderedItems, newOrderItem])
    }

    useEffect(() => {
        setCost(calculateCost(price, ing))
    }, [ing])

    return (
        <div className="container">
            <div className="ml-4">
                <figure className="image is-128x128">
                    <img className="is-rounded" src={img} width="200px" />
                </figure>
                <div>Price : {price}</div>
                <div className="my-3">Quantity in Tea Spoons</div>
                <IngQuant
                    name="Milk"
                    min={0}
                    max={3}
                    value={ing.milk}
                    setValue={setIngValue("milk")}
                />

                <IngQuant
                    name="Sugar"
                    min={0}
                    max={3}
                    value={ing.sugar}
                    setValue={setIngValue("sugar")}
                />

                <IngQuant
                    name="Honey"
                    min={0}
                    max={3}
                    value={ing.honey}
                    setValue={setIngValue("honey")}
                />

                <div className="tabs is-toggle is-small">
                    <ul>
                        <li
                            className={
                                ing.doubleShot == false ? "is-active" : ""
                            }
                            onClick={() =>
                                setIng({ ...ing, doubleShot: false })
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
                            onClick={() => setIng({ ...ing, doubleShot: true })}
                        >
                            <a>
                                <span>Double Shot</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="is-size-5 block"> Net Cost : {cost}</div>
                <button
                    className="button is-success"
                    type="submit"
                    onClick={onSubmit}
                >
                    <span className="p-6">Add</span>
                </button>
            </div>
        </div>
    )
}
