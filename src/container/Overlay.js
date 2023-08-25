import React from "react";
import { Dropdown } from "react-bootstrap";

export const Overlay = ({title, children}) =>{
    return(
        <Dropdown className="dropdown-overlay">
            <Dropdown.Toggle variant="light">
                {title}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {children}
            </Dropdown.Menu>
        </Dropdown>
    )
}