import React from "react"

export function ModalGeneric({
    isActive,
    setIsActive,
    children,
}: {
    isActive: boolean
    setIsActive(arg0: boolean): void
    children: any
}) {
    return (
        <div className={"modal " + (isActive && "is-active")}>
            <div
                className="modal-background"
                onClick={() => setIsActive(false)}
            ></div>
            <div className="modal-content">
                <div className="box">{children}</div>
            </div>
            <button
                className="modal-close is-large"
                aria-label="close"
                onClick={() => setIsActive(false)}
            ></button>
        </div>
    )
}
