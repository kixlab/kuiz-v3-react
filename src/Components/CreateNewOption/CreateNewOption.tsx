import React from 'react';
import "./CreateNewOption.scss";

function CreateNewOption() {
    return (
            <div>
                <h3>Create New Option</h3>
                <div className='Toggles'>
                    <div id="Ans" className="ToggleBtn"><strong>Answer</strong></div>
                    <div id="Dist" className="ToggleBtn"><strong>Distractor</strong></div>
                </div>
                <div>
                    <input type="text" placeholder='Suggest an answer or distractor for this question'></input>
                    <div className="CatBtn">+<input id="CatInput" type="text" placeholder='Select categories for your option or add your own'/></div>
                    <div className='Categories'>
                        <div className='Category'>Common misconception</div>
                        <div className='Category'>Form similar to answer</div>
                    </div>
                    <button id="SubmitBtn" disabled>Submit</button>
                </div>
            </div>
    )
}

export default CreateNewOption;