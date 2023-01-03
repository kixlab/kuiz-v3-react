import React from 'react';
import styled from 'styled-components';
import { CategoryInput } from '../../Components/CategoryInput/CategoryInput';
import EditorContainer from '../../Components/TextEditor/TextEditor';
import TextEditor from '../../Components/TextEditor/TextEditor';
import "./CreateQuestion.scss";

function CreateQuestion() {
    function getCategory(cat:string) {
        console.log(cat);
    }

    return (
        <CreateQBox>
            <div>
                <div className='QuestionLabel'>Learning Objective</div>
                {/* <input type='text' placeholder='Write down the objective'/> */}
                <CategoryInput getCategory={getCategory}/>
            </div>
            <TextEditor title="Question Stem"/>
            <TextEditor title="Explanation"/>
            <div>
                <div className='QuestionLabel'>Answer</div>
                <input type='text' placeholder='Suggest an answer'/>
            </div>
            <button disabled>Submit</button>
        </CreateQBox>
    )
}

//CreateQBox is here!
const CreateQBox = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 30px 0 30px 0;
`

export default CreateQuestion;