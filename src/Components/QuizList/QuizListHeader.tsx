import React from 'react';
import "./QuizList.scss";

const QuizListHeader = () => {
    return (
        <div id="Header" className="QuizList">
            <div>Question</div>
            <div># of Options</div>
            <div>Last Updated</div>
        </div>
    )
}

export default QuizListHeader;