import React from 'react';
import CategoryInput from '../CategoryInput/CategoryInput';
import "./CreateNewOption.scss";

const CreateNewOption = () => {
    return (
            <div>
                <h3>Create New Option</h3>
                <div className='Toggles'>
                    <div id="Ans" className="ToggleBtn"><strong>Answer</strong></div>
                    <div id="Dist" className="ToggleBtn"><strong>Distractor</strong></div>
                </div>
                <div>
                    <input type="text" placeholder='Suggest an answer or distractor for this question'></input>
                    <CategoryInput />
                    <button id="SubmitBtn" disabled>Submit</button>
                </div>
            </div>
    )
}

export default CreateNewOption;