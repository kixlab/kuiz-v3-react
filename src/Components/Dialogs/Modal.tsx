import { PropsWithChildren } from 'react'
import styled from '@emotion/styled'

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
  @media (max-width: 599px) {
    align-items: center;
  }
`

const DialogBox = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  padding: 30px 40px;
  margin: auto;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: white;
  z-index: 21;
  @media (max-width: 599px) {
    width: 100%;
    height: 200px;
    margin: 0 40px 0 40px;
  }
`

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
`
