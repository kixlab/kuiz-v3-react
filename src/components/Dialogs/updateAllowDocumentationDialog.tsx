import styled from '@emotion/styled'
import { useState, ChangeEvent } from 'react'
import { FillButton } from '@components/basic/button/Fill'
import { Modal } from './Modal'
import { Label } from '@components/basic/Label'

interface Props {
  modalState: boolean
  submit: (allow: boolean) => void
}

export const UpdateAllowDocumentationDialog = (props: Props) => {
  const [allowDocumentation, setAllowDocumentationStudentID] = useState<boolean>(false)
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAllowDocumentationStudentID(e.target.checked)
  }
  if (props.modalState) {
    return (
      <Modal>
        <Label color="black" size={1}>
          Allow the use of questions generated for research purposes?
        </Label>
        <CheckBoxContainer>
          <input type="checkbox" id="allow" name="allow" onChange={inputChange} />
          <label htmlFor="allow">Allow</label>
        </CheckBoxContainer>
        <BtnRow>
          <FillButton onClick={() => props.submit(allowDocumentation)}>Submit</FillButton>
        </BtnRow>
      </Modal>
    )
  } else {
    return null
  }
}

const BtnRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`

const CheckBoxContainer = styled.div``
