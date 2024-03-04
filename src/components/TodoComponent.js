import React from "react";
import { IoMdAlert } from "react-icons/io";
import { FiAlertTriangle } from "react-icons/fi";
import { MdPending } from "react-icons/md";

export const TodoComponent = () =>{
    const list = [
        {
            title: 'Overdue',
            isOverdue: true,
            isUpComming: false,
            isPending: false,
            css: 'text-danger'
        },{
            title: 'Due by sept 5th',
            isOverdue: false,
            isUpComming: true,
            isPending: false,
            css: 'text-warning'
        },{
            title: 'Upcoming',
            isOverdue: false,
            isUpComming: false,
            isPending: true,
            css: 'text-success'
        },
    ];
    return(
        <div className="bg-white shadow rounded-3 p-3" style={{width: '400px'}}>
            <div className="border-2 border-bottom fw-bold pb-3 mb-2">Top to-dos</div>
            <div className="">
                {list.map((todo, key)=>(
                    <div className="d-flex align-items-center border-bottom py-2" key={key}>
                        <div className="me-2">
                            {todo.isOverdue ? <IoMdAlert className="text-danger"/> : null}
                            {todo.isUpComming ? <FiAlertTriangle className="text-warning"/> : null}
                            {todo.isPending ? <MdPending className="text-success"/> : null}
                        </div>
                        <div>
                            <div className={`small ${todo.css}`}><small>{todo.title}</small></div>
                            <div className="small">Outstanding timesheet for Sam Smith on the sea o asdfh gahfadfakshga adfhasdfa afaha aha</div>
                            <div className="small"><small>15 minutes ago</small></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center pt-2">
                <button className="btn link-primary">View all notification</button>
            </div>
        </div>
    )
}