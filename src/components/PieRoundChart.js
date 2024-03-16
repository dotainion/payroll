import React, { useEffect, useState } from "react";
import { PieChart } from 'react-minimal-pie-chart';

export const PieRoundChart = () =>{

    return(
        <div className="rounded-circle shadow bg-white border p-3" style={{width: '400px', height: '400px'}}>
            <PieChart
                data={[
                    { title: 'One', value: 10, color: '#6c757d' },
                    { title: 'Two', value: 10, color: '#ced4da' },
                    { title: 'Three', value: 10, color: '#adb5bd' },
                ]}
                animate={true}
                animationDuration={5000}
                onClick={(e, segmentIndex)=>console.log(segmentIndex)}
                lineWidth={80}
                paddingAngle={5}
                label={(chart)=>['data collection', 'calculation', 'disbursement'][chart.dataIndex]}
                labelStyle={(index)=>({fontSize: '6px'})}
                labelPosition={50}
                animationEasing={'ease-in-out'}
                background={'#e9ecef'}
            />
        </div>
    )
}