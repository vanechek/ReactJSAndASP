import React from 'react'
import './menuItems.css'
import { NavLink } from 'react-router-dom';

function MenuItems() {

    let menuItems = [];
    menuItems.push(
        {
            name: "Личный кабинет",
            href: "/",
            isMain: true
        },
        {
            name: "Аккаунты",
            href: "/accounts",
            isMain: false
        },
        {
            name: "Магазин",
            href: "/shop",
            isMain: false
        },
        {
            name: "Фастфуд",
            href: "/fastFood",
            isMain: false
        }
    )

    return menuItems.map(function (item, index) {
        return <div className="menuItem" key={index}>
            <nav>
                {
                    item.isMain 
                    ? <NavLink to={item.href} exact>{item.name}</NavLink>
                    : <NavLink to={item.href}>{item.name}</NavLink>
                }
            </nav>
        </div>
    }, this)

}

export default MenuItems
