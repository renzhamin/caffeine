import React from "react"

export function ButtonsArray({
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
    const arr: number[] = []
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
