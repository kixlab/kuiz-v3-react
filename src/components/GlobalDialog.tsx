import { removeError } from '@redux/features/errorSlice'
import { RootState } from '@redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { CheckDialog } from './Dialogs/CheckDialog'

export function GlobalDialog() {
  const dispatch = useDispatch()
  const errorTitle = useSelector((state: RootState) => state.error.title)
  const errorMessage = useSelector((state: RootState) => state.error.message)
  const errorAvailable = useSelector((state: RootState) => state.error.error)

  return (
    <CheckDialog
      title={errorTitle}
      message={errorMessage}
      modalState={errorAvailable}
      btnName="Ok"
      toggleModal={() => {
        dispatch(removeError())
      }}
    />
  )
}
