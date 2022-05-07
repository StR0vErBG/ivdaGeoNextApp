// React and nextJs things
import React from 'react';

// Styles
const NavLinks = () => {
    return (
        <ul className="navigation">
            <li className="menu">Интрументи и железария</li>
                <ul className="submenu">
                    <li><a href="#">Акумулаторни комплекти</a></li>
                    <li><a href="#">Тест</a></li>
                </ul>

            <li className="menu">Градина</li>
            <ul className="submenu">
                <li>
                    <a href="#">Градински мебели</a>
                </li>
            </ul>

            <li className="menu">Кухня</li>
            <ul className="submenu">
                <li>
                    <a href="#">Кухненски мебели</a>
                </li>
            </ul>

        <li className="menu">Баня</li>
        <ul className="submenu">
            <li>
                <a href="#">Мебели и огледала за баня</a>
            </li>
        </ul>

        <li className="menu">Отопление, Охлаждане и Вик</li>
        <ul className="submenu">
            <li>
                <a href="#">Климатици</a>
            </li>
        </ul>

        <li className="menu">Подови и стенни покрития</li>
        <ul className="submenu">
            <li>
                <a href="#">Плочки и лайсни</a>
            </li>
        </ul>


</ul>
    );
}

export default NavLinks;