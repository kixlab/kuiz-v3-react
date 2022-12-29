import React, { useEffect, useState } from 'react';
import CategoryInput from '../CategoryInput/CategoryInput';
import "./CreateNewOption.scss";

const CreateNewOption = () => {
    const [tag, setTag] = useState<string>("Ans");

    function getCategory(cat:string) {
        console.log(cat);
    }

    return (
            <div>
                <h3>Create New Option</h3>
                <div className='Toggles'>
                    <div onClick={()=>setTag("Ans")} id={tag=="Ans" ? "AnsAct" : "Ans"} className="ToggleBtn"><strong>Answer</strong></div>
                    <div onClick={()=>setTag("Dist")} id={tag=="Dist" ? "DistAct" : "Dist"} className="ToggleBtn"><strong>Distractor</strong></div>
                </div>
                <div>
                    <input type="text" placeholder='Suggest an answer or distractor for this question'></input>
                    <CategoryInput getCategory={getCategory}/>
                    <button id="SubmitBtn" disabled>Submit</button>
                </div>
            </div>
    )
}

export default CreateNewOption;