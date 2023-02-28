import { QuizListContent } from '@components/QuizListContent'
import { QuizListHeader } from '@components/QuizListHeader'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { QStem } from '@server/db/qstem'
import { request } from '@utils/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CheckClassTypeParams, CheckClassTypeResults } from '../api/auth/checkClassType'
import { CheckIsInClassParams, CheckIsInClassResults } from '../api/auth/checkIsInClass'
import { LoadClusterParams, LoadClusterResults } from '../api/question/cluster/loadCluster'
import { LoadProblemListParams, LoadProblemListResults } from '../api/question/loadProblemList'

export default function Page() {
  const { push, query } = useRouter()
  const cid = query.cid as string | undefined
  const createOptions = location.pathname.includes('qlist')
  const uid = useSelector((state: RootState) => state.userInfo._id)
  const [questionList, setQuestionList] = useState<QStem[]>([])
  const [validList, setValidList] = useState<boolean[]>([false])

  const getQuestionList = useCallback(
    async (cid: string) => {
      const res = await request<LoadProblemListParams, LoadProblemListResults>(`question/list/load`, {
        cid: cid,
      })
      if (res) {
        const valid = [false]

        await Promise.all(
          res.problemList.map(async (q, i) => {
            const res2 = await request<LoadClusterParams, LoadClusterResults>(`question/load/cluster`, {
              qid: q._id,
            })
            if (res2) {
              const clusters = await res2.cluster
              const ans = clusters.filter(c => c.representative.is_answer).length
              const dis = clusters.filter(c => !c.representative.is_answer).length
              if (ans + dis >= 4) {
                valid[i] = true
                return true
              } else {
                valid[i] = false
                return false
              }
            }
          })
        )
        setValidList(valid)
        setQuestionList(res.problemList)
      }
    },
    [setValidList, setQuestionList]
  )

  const checkValidUser = useCallback(async () => {
    if (cid) {
      const res = await request<CheckIsInClassParams, CheckIsInClassResults>(`auth/check/inclass`, {
        cid: cid,
        uid: uid,
      })
      if (res) {
        if (res.inclass) {
          res.cid && getQuestionList(res.cid)
        } else {
          if (!res.enrolled) {
            push('/')
          } else {
            const res2 = await request<CheckClassTypeParams, CheckClassTypeResults>(`auth/class/type`, {
              cid: cid,
            })
            if (res2 && res2.valid) {
              getQuestionList(cid)
            }
          }
        }
      }
    }
  }, [cid, uid, getQuestionList, push])

  useEffect(() => {
    checkValidUser()
  }, [checkValidUser])
  return (
    <BoxShadow>
      <QuizListHeader />
      {questionList
        .filter((q, j) => validList[j])
        .map((question, index) => (
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            key={question._id}
            href={
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
              type={index + 1 === questionList.length ? 'End' : 'Content'}
            />
          </Link>
        ))
        .reverse()}
    </BoxShadow>
  )
}

const BoxShadow = styled.div`
  box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.12);
  border-radius: 8px;
`
