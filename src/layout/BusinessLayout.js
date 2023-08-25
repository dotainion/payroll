import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from "../router/routes";
import { MdOutlineAccountTree } from "react-icons/md";
import $ from 'jquery';

const Context = createContext();
export const useAdmin = () => useContext(Context);

export const BusinessLayout = ({children}) =>{
    const [data, setData] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const addData = (objs) =>{
        setData((obj)=>{
            Object.keys(objs||{}).forEach((j)=>{
                obj[j] = objs[j]
            });
            return obj;
        });
    }

    useEffect(()=>{
        $('[data-first]').removeClass('border-success bg-success').addClass('bg-primary border-primary');
        $('[data-second]').removeClass('border-success bg-success').addClass('bg-primary border-primary');
        $('[data-third]').removeClass('border-success bg-success').addClass('bg-primary border-primary');
        if(location.pathname.includes(routes.business().profile())){
            $('[data-first]').addClass('border-success bg-success').removeClass('bg-primary border-primary');
        }else if (location.pathname.includes(routes.business().credentials())){
            $('[data-first]').addClass('border-success bg-success').removeClass('bg-primary border-primary');
            $('[data-second]').addClass('border-success bg-success').removeClass('bg-primary border-primary');
        }else if (location.pathname.includes(routes.business().finalize())){
            $('[data-first]').addClass('border-success bg-success').removeClass('bg-primary border-primary');
            $('[data-second]').addClass('border-success bg-success').removeClass('bg-primary border-primary');
            $('[data-third]').addClass('border-success bg-success').removeClass('bg-primary border-primary');
        }
    }, [location]);

    const value = {
        data,
        addData
    };

    return(
        <Context.Provider value={value}>
            <div className="bg-light w-100 vh-100 overflow-auto">
                <div className="col-md-7 col-lg-7 col-xl-5 m-auto">
                    <div className="d-flex align-items-center border-bottom w-100 p-4 text-nowrap">
                        <div className="me-3">
                            <MdOutlineAccountTree style={{fontSize: '40px'}}/>
                        </div>
                        <div data-first="" className="p-1 bg-primary rounded-circle"></div>
                        <div className="w-100">
                            <div data-first="" className="w-100 border border-primary"></div>
                        </div>
                        <div data-second="" className="p-1 bg-primary rounded-circle"></div>
                        <div className="w-100">
                            <div data-second=""  className="w-100 border border-primary"></div>
                        </div>
                        <div data-third="" className="p-1 bg-primary rounded-circle"></div>
                        <div className="w-100">
                            <div data-third="" className="w-100 border border-primary"></div>
                        </div>
                        <div className="p-1 bg-primary rounded-circle"></div>
                    </div>
                    <div className="bg-light p-4">
                        {children}
                    </div>
                </div>
            </div>
        </Context.Provider>
    )
}