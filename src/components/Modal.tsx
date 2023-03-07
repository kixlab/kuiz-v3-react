import { PropsWithChildren } from 'react'
import styled from '@emotion/styled'
import { MOBILE_WIDTH_THRESHOLD } from 'src/constants/ui'

export const Modal = ({ children }: PropsWithChildren) => {
  return (
    <ModalContainer>
      <DialogBox>{children}</DialogBox>
      <Backdrop />
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 20;
  @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
    align-items: center;
  }
`

const DialogBox = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: space-between;
  padding: 30px 40px;
  margin: auto;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: white;
  z-index: 21;
  @media (max-width: ${MOBILE_WIDTH_THRESHOLD}px) {
    width: 100%;
    height: 200px;
    margin: 0 40px 0 40px;
  }
`

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
`
