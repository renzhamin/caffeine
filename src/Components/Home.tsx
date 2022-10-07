import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { ItemProps } from "../types"
import { AppContext } from "../App"

function DisplayItem(item: ItemProps) {
    const { name, img, price } = item

    return (
        <Link className="column is-4" to={"/item/" + item.id}>
            <div className="card">
                <div className="card-image">
                    <figure className="p-4 image is-128x128">
                        <img src={img} alt={name} />
                    </figure>
                </div>

                <p className="is-4 ml-4">{name}</p>
                <p className="is-4 ml-4 pb-4">Price : {price}</p>
            </div>
        </Link>
    )
}
export function Home() {
    const { totalItems } = useContext(AppContext)

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
