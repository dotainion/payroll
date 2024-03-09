import React from "react";
import { PieChart } from 'react-minimal-pie-chart';

export const PieRoundChart = () =>{
    return(
        <div className="rounded-circle shadow bg-white border p-3" style={{width: '400px', height: '400px'}}>
            <PieChart
                data={[
                    { title: 'One', value: 10, color: '#6c757d' },//#f8f9fa
                    { title: 'Two', value: 10, color: '#ced4da' },//#dee2e6
                    { title: 'Three', value: 10, color: '#adb5bd' },//#ced4da
                ]}
                animate={true}
                animationDuration={5000}
                onClick={(e, segmentIndex)=>console.log(segmentIndex)}
                lineWidth={80}
                paddingAngle={5}
                //rounded={100}
                //reveal={20}
                label={(i)=>i.dataIndex}
                labelPosition={50}
                animationEasing={'ease-in-out'}
                background={'#e9ecef'}
            />
        </div>
    )
}