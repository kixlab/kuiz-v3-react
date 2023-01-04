import { useState } from 'react';
import { CategoryInput } from './CategoryInput';
import styled from '@emotion/styled';
import { css } from '@emotion/react';


export const CreateNewOption = () => {
    const [tag, setTag] = useState<string>("Ans");

    function getCategory(cat:string) {
        console.log(cat);
    }

    return (
            <div>
                <h3>Create New Option</h3>
                <Toggles>
                    <ToggleBtn onClick={()=>setTag("Ans")} id={tag=="Ans" ? "AnsAct" : "Ans"}><strong>Answer</strong></ToggleBtn>
                    <ToggleBtn onClick={()=>setTag("Dist")} id={tag=="Dist" ? "DistAct" : "Dist"}><strong>Distractor</strong></ToggleBtn>
                </Toggles>
                <div>
                    <Input type="text" placeholder='Suggest an answer or distractor for this question' />
                    <CategoryInput getCategory={getCategory}/>
                    <SubmitBtn disabled>Submit</SubmitBtn>
                </div>
            </div>
    )
}

const Input = styled.input`
    padding: 16px;
    border-radius: 6px;
    border: 1px solid #bdbdbd;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    &:placeholder {
        color: #b7bfc7;
    }
    &:focus{
        outline:none;
        border-color: #212121;
    }
`

const Toggles = styled.div`
    margin-bottom: 20px;
`

const SubmitBtn = styled.button`
    margin-top: 20px;
`
const ToggleBtn = styled.div`
    display: inline-block;
    padding: 8px 12px 8px 12px;
    text-align: center;
    border-radius: 20px;
    border: 2px solid rgba(0,0,0,0);
    cursor: pointer;
    ${props=>props.id === 'Ans' && css`
        border-color: rgb(30, 144, 30);
        color: rgb(10, 80, 10);
        margin-right: 8px;
    `}

    ${props=>props.id === 'AnsAct' && css`
        background-color: rgb(30, 144, 30);
        color: white;
        margin-right: 8px;
    `}

    ${props=>props.id === 'Dist' && css`
        border-color: rgb(220, 51, 51);
        color: rgb(205, 0, 0);
    `}

    ${props=>props.id === 'DistAct' && css`
        background-color: rgb(220, 51, 51);
        color: white;
    `}

    ${props=>props.id === 'SubmitBtn' && css`
        margin-top: 20px;
    `}
`
