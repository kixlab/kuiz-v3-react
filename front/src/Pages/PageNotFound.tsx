import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { RootState } from '../state/store'
import { enroll } from '../state/features/userSlice'
import { Post, Get } from '../utils/apiRequest'
import { CheckIsInClassParams, CheckIsInClassResults } from '../api/auth/checkIsInClass'
import { CheckClassTypeParams, CheckClassTypeResults } from '../api/auth/checkClassType'

export const PageNotFound = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const uid = useSelector((state: RootState) => state.userInfo?._id)

  const checkValidUser = useCallback(() => {
    Post<CheckIsInClassParams, CheckIsInClassResults>(`${process.env.REACT_APP_BACK_END}/auth/check/inclass`, {
      cid: 'invalid',
      uid: uid,
    }).then((res: CheckIsInClassResults | null) => {
      if (res) {
        if (!res.enrolled) {
          navigate('/')
        } else {
          if (res.cid) {
            const cid = res.cid
            Get<CheckClassTypeParams, CheckClassTypeResults>(`${process.env.REACT_APP_BACK_END}/auth/class/type`, {
              cid: cid,
            }).then((res2: CheckClassTypeResults | null) => {
              if (res2) {
                dispatch(enroll({ cid: cid, cType: res2.cType }))
                navigate('/' + cid)
              }
            })
          }
        }
      }
    })
  }, [dispatch, navigate, uid])

  useEffect(() => {
    checkValidUser()
  }, [checkValidUser])

  return <div>Page Not Found 404</div>
}
