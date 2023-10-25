import React from "react";  
import { File } from "../../utils/File";

const file = new File();
export const Download = ({className, title, targetRef}) =>{
    const onDownload = () =>{
        file.download(targetRef.current);
    }

    return(
        <button onClick={onDownload} className={className}>{title}</button>
    )
}