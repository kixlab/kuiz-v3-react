import styled from '@emotion/styled'
import { FillBtn } from '../Components/basic/button/Button'
import { TextInput } from '../Components/basic/InputBox'

export function Enroll() {
  return (
    <CodeInputBox>
      <strong>Class code</strong>
      <TextInput placeholder="Enter code" />
      <FillBtn>Enter</FillBtn>
    </CodeInputBox>
  )
}

const CodeInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 100px 60px 30px 60px;
  box-sizing: border-box;
  font-size: 18px;
`
