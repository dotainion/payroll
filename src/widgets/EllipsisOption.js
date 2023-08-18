import React from "react";
import { Dropdown } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";

export const EllipsisOption = ({option, children}) =>{
    return(
        <Dropdown className="ellipis-dropdown">
            <Dropdown.Toggle variant="light">
                <FaEllipsisV/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {option?.map((opt, key)=>(
                    <Dropdown.Item onClick={opt.onClick} key={key}>{opt.title}</Dropdown.Item>
                ))}
                {children}
            </Dropdown.Menu>
        </Dropdown>
    )
}