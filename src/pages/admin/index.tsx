import { Label } from '@components/basic/Label'
import { RootState } from '@redux/store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Page() {
  const isAdmin = useSelector((state: RootState) => state.userInfo.isAdmin)
  const { push } = useRouter()

  useEffect(() => {
    !isAdmin ? push('/') : null
  }, [isAdmin, push])

  return <>{!isAdmin ? <Label text="403 Forbidden" color="black" size={0} /> : null}</>
}
