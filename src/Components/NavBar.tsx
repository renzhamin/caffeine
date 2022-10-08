import React, { useState } from "react"
import { Link } from "react-router-dom"

export function NavBar() {
    const [burgerExpanded, setBurgerExpanded] = useState("")

    return (
        <nav
            className="navbar mb-6"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img
                        src="https://bulma.io/images/bulma-logo.png"
                        width="112"
                        height="28"
                        alt="logo"
                    />
                </a>

                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={() => {
                        if (burgerExpanded === "is-active") {
                            setBurgerExpanded("")
                        } else {
                            setBurgerExpanded("is-active")
                        }
                    }}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div
                id="navbarBasicExample"
                className={"navbar-menu " + burgerExpanded}
            >
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">
                        Home
                    </Link>

                    <Link to="/checkout" className="navbar-item">
                        Checkout
                    </Link>
                </div>
            </div>
        </nav>
    )
}
