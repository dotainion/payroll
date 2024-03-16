import React, { useEffect, useRef, useState } from "react";
import { Searchbar } from "./Searchbar";
import $ from 'jquery';
import { api } from "../request/Api";
import { Dropdown } from "react-bootstrap";
import { BsTicketDetailedFill } from "react-icons/bs";
import { Tooltip } from "../container/Tooltip";


export const ReportExpandableColumn = ({value, items, collapse}) =>{
    return(
        <div className="w-100">
            <div hidden={!collapse}>
                {items?.map?.((item, key)=>(
                    <ColumnRow item={item} key={key}/>
                ))}
            </div>
            <div className="d-flex align-items-center justify-content-end w-100 h-100" style={{zIndex: '-1'}}>
                <div className="fw-bold">$</div>
                <div className="fw-bold ms-1 w-100">{value}</div>
                {!collapse && items?.length &&
                <Dropdown className="report-overlay-item">
                    <Dropdown.Toggle variant="light">
                        <BsTicketDetailedFill/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <div className="px-3">
                            {items?.map?.((item, key)=>(
                                <ColumnRow item={item} key={key}/>
                            ))}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>}
            </div>
        </div>
    )
}

const ColumnRow = ({item}) =>{
    return(
        <div className="d-flex align-items-center w-100 small">
            <div className="w-100 text-truncate">{item?.attributes?.name}</div>
            <div className="fw-bold ms-1"><span>$</span>{parseFloat(item?.attributes?.net || 0).toFixed(2)}</div>
        </div>
    )
}

