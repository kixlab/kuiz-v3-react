import styled from '@emotion/styled';

export function Enroll() {
    return (
        <CodeInputBox>
            <strong>Class code</strong>
            <ClassCodeInput type="text" placeholder='Enter code' />
            <EnrollBtn>Enter</EnrollBtn>
        </CodeInputBox>
    )
}

const CodeInputBox = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 100px 60px 30px 60px;
    box-sizing: border-box;
    font-size: 18px;
`

const ClassCodeInput = styled.input`
    width: 234px;
    padding: 16px;
    border-radius: 6px;
    border: 1px solid #cdcdcd;
    font-size: 16px;
    &:placeholder{
        color: #bdbdbd;
    }
    &:focus{
        outline: none;
        border: 1px solid #212121;
    }
`

const EnrollBtn = styled.button`
    width: 234px;
`
