import React from 'react';
import "./QuizList.scss";

const QuizListContent = (props:{type:string}) => {
    return (
        <div id={props.type} className="QuizList">
                <div className='item'>What is the main question?</div>
                <div className='item' >3</div>
                <div className='item'>1 day ago</div>
        </div>
    )
}

export default QuizListContent;