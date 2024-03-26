import React from "react";

export const EmployeeSettingCard = ({hasCredential, onAssignClick}) =>{
    return(
        <div>
            {
                hasCredential ?
                <ul className="list-group">
                    <li className="small list-group-item">You cannot modify user password, please note that password recovery can be done by the login screen and should meet the minimal password strength requirements.</li>
                    <li className="small list-group-item">Password must be at least 7 digits, contain a capital letter, number (0-9) and a special character</li>
                </ul>  
                :
                <ul className="list-group">
                    <li className="small list-group-item">You can add credentials to this user only once.</li>
                    <li className="small list-group-item">You cannot change password when submited.</li>
                    <li className="small list-group-item">You can only remove credential from this user which will restrict user access.</li>
                    <li className="small list-group-item">Please note that your new password should meet the minimal password strength requirements.</li>
                    <li className="small list-group-item">Password must be at least 7 digits, contain a capital letter, number (0-9) and a special character</li>
                    <div className="my-2">
                        <button onClick={onAssignClick} className="btn btn-sm btn-outline-primary">Assign credentials to this user</button>
                    </div>
                </ul>
            }
        </div> 
    )
}