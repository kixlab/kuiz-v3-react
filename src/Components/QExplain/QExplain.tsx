import React from 'react';
import "./QExplain.scss";

const QExplain = (props:{type:string}) => {
    let label='';

    if (props.type=="Objective"){
        label = 'Learning Objective';
    }
    else label = 'Explanation';
    
    return (
            <div className='LabelBox'>
                <div className='Label'>{label}</div>
                <div>abcd</div>
            </div>

    )
}

export default QExplain;
