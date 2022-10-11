import React, { ReactNode } from "react"
import { ModalGeneric } from "./ModalGeneric"

export function ModalYesNo({
    isActive,
    setIsActive,
    onYes,
    onNo,
    yesIsGood,
    text,
    children,
}: {
    isActive: boolean
    setIsActive(arg0: boolean): void
    onYes(): void
    onNo(): void
    yesIsGood: boolean
    text: string
    children?: ReactNode
}) {
    return (
        <ModalGeneric isActive={isActive} setIsActive={setIsActive}>
            <div>{text}</div>
            <div className="mt-3">
                <button
                    className={
                        "button " + (yesIsGood ? "is-success" : "is-danger")
                    }
                    onClick={() => onYes()}
                >
                    Yes
                </button>
                <button
                    className={
                        "ml-4 button " +
                        (yesIsGood ? "is-danger" : "is-success")
                    }
                    onClick={() => onNo()}
                >
                    No
                </button>
            </div>
            {children}
        </ModalGeneric>
    )
}
