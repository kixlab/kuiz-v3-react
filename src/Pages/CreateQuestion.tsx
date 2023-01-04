import styled from '@emotion/styled';
import { CategoryInput } from '../Components/CategoryInput';
import { TextEditor } from '../Components/TextEditor';

export function CreateQuestion() {
    function getCategory(cat:string) {
        console.log(cat);
    }

    return (
        <CreateQBox>
            <div>
                <QuestionLabel>Learning Objective</QuestionLabel>
                {/* <input type='text' placeholder='Write down the objective'/> */}
                <CategoryInput getCategory={getCategory}/>
            </div>
            <TextEditor title="Question Stem"/>
            <TextEditor title="Explanation"/>
            <div>
                <QuestionLabel>Answer</QuestionLabel>
                <Input type='text' placeholder='Suggest an answer'/>
            </div>
            <button disabled>Submit</button>
        </CreateQBox>
    )
}

const CreateQBox = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 30px 0 30px 0;
`

const QuestionLabel = styled.div`
    color: #3d8add;
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 12px;
`

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
