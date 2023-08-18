import React, { forwardRef } from "react";

export const ToPrintAndDownload = forwardRef(({children}, ref) =>{
    return(
        <div ref={ref}>
            {children}
        </div>
    )
})
