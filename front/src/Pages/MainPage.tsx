import styled from '@emotion/styled'
import { QuizListContent } from '../Components/QuizListContent'
import { QuizListHeader } from '../Components/QuizListHeader'
import { useNavigate } from 'react-router-dom'
import { useParams, Link } from 'react-router-dom'
import { useCallback } from 'react'
import { RootState } from '../state/store'
import { useEffect } from 'react'
import { Post, Get } from '../utils/apiRequest'
import { qinfoType } from '../apiTypes/qinfo'
import { clusterType } from '../apiTypes/cluster'
import { useLocation } from 'react-router-dom'
import { CheckIsInClassParams, CheckIsInClassResults } from '../api/auth/checkIsInClass'
import { LoadClusterParams, LoadClusterResults } from '../api/question/cluster/loadCluster'
import { LoadProblemListParams, LoadProblemListResults } from '../api/question/loadProblemList'
import { CheckClassTypeParams, CheckClassTypeResults } from '../api/auth/checkClassType'
import { useSelector, useDispatch } from 'react-redux'
import { addQList } from '../state/features/cacheSlice'

export function MainPage() {
  const dispatch = useDispatch()
  const qList = useSelector((state: RootState) => state.cache.qList)
  const navigate = useNavigate()
  const cid = useParams().cid
  const location = useLocation()
  const createOptions = location.pathname.includes('qlist')
  const uid = useSelector((state: RootState) => state.userInfo._id)

  const getQuestionList = useCallback(
    (cid: string) => {
      Get<LoadProblemListParams, LoadProblemListResults>(`${process.env.REACT_APP_BACK_END}/question/list/load`, {
        cid: cid,
      }).then(async (res: LoadProblemListResults | null) => {
        if (res) {
          const valid = [false]

          await Promise.all(
            res.problemList.map(async (q: qinfoType, i: number) => {
              await Get<LoadClusterParams, LoadClusterResults>(
                `${process.env.REACT_APP_BACK_END}/question/load/cluster`,
                {
                  qid: q._id,
                }
              )
                .then(async (res2: LoadClusterResults | null) => {
                  if (res2) {
                    const clusters = await res2.cluster
                    const ans = clusters.filter((c: clusterType) => c.representative.is_answer).length
                    const dis = clusters.filter((c: clusterType) => !c.representative.is_answer).length
                    if (ans + dis >= 4) {
                      valid[i] = true
                      return true
                    } else {
                      valid[i] = false
                      return false
                    }
                  }
                })
                .catch(err => console.log(err))
            })
          )
          dispatch(addQList(res.problemList.filter((q: qinfoType, j: number) => valid[j]).reverse()))
        }
      })
    },
    [dispatch, addQList, cid]
  )

  const checkValidUser = useCallback(() => {
    cid &&
      Post<CheckIsInClassParams, CheckIsInClassResults>(`${process.env.REACT_APP_BACK_END}/auth/check/inclass`, {
        cid: cid,
        uid: uid,
      }).then((res: CheckIsInClassResults | null) => {
        if (res) {
          if (qList.length === 0) {
            if (res.inclass) {
              res.cid && getQuestionList(res.cid)
            } else {
              if (!res.enrolled) {
                navigate('/')
              } else {
                cid &&
                  Get<CheckClassTypeParams, CheckClassTypeResults>(
                    `${process.env.REACT_APP_BACK_END}/auth/class/type`,
                    {
                      cid: cid,
                    }
                  ).then((res2: CheckClassTypeResults | null) => {
                    if (res2 && res2.valid) {
                      getQuestionList(cid)
                    }
                  })
              }
            }
          }
        }
      })
  }, [cid, uid, getQuestionList, navigate])

  useEffect(() => {
    checkValidUser()
  }, [checkValidUser])

  return (
    <BoxShadow>
      <QuizListHeader />
      {qList.map((question: qinfoType, index: number) => (
        <Link
          style={{ color: 'inherit', textDecoration: 'none' }}
          key={question._id}
          to={
            createOptions
              ? '/' + cid + '/question/' + question._id + '/createOption'
              : '/' + cid + '/solve/' + question._id
          }
        >
          <QuizListContent
            key={index}
            index={index + 1}
            title={question.raw_string}
            options={question.options.length}
            date={question.updatedAt ? new Date(question.updatedAt) : new Date(question.createdAt)}
            type={index + 1 === qList.length ? 'End' : 'Content'}
          />
        </Link>
      ))}
    </BoxShadow>
  )
}

const BoxShadow = styled.div`
  box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.12);
  border-radius: 8px;
`
