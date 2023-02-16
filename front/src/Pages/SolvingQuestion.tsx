import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { RootState } from '../state/store'
import { useParams } from 'react-router-dom'
import { qinfoType } from '../apiTypes/qinfo'
import { optionType } from '../apiTypes/option'
import { clusterType } from '../apiTypes/cluster'
import { FillBtn, StrokeBtn } from '../Components/basic/button/Button'
import { typography } from '../styles/theme'
import { InputDialog } from '../Components/Dialogs/InputDialog'
import { OptionBtn } from '../Components/basic/button/OptionButton'
import ObjectID from 'bson-objectid'
import { Post, Get } from '../utils/apiRequest'
import { SolveQuestionParams, SolveQuestionResults } from '../api/question/solveQuestion'
import { LoadProblemDetailParams, LoadProblemDetailResults } from '../api/question/loadProblemDetail'
import { LoadClusterParams, LoadClusterResults } from '../api/question/cluster/loadCluster'
import { useSelector, useDispatch } from 'react-redux'
import { addVisitedProblem } from '../state/features/cacheSlice'

export function SolvingQuestion() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const qid = useParams().id
  const visitedQuestions = useSelector((state: RootState) => state.cache.visitedQuestions)
  const cid = useParams().cid
  const uid = useSelector((state: RootState) => state.userInfo._id)
  // all the options created for the question
  const [optionSet, setOptionSet] = useState<optionType[]>()
  // the 4 options selected post shuffle
  const [options, setOptions] = useState<optionType[]>([])
  const [qinfo, setQinfo] = useState<qinfoType>()
  const [ansVisible, setAnsVisible] = useState(true)
  const [selected, setSelected] = useState<number>(-1)
  const [answer, setAnswer] = useState<number>()
  const [isSolved, setIsSolved] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const getMultipleRandom = useCallback((arr: clusterType[], num: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, num)
  }, [])

  const shuffle = useCallback((array: optionType[]) => {
    array.sort(() => Math.random() - 0.5)
    return array
  }, [])

  const getQinfo = useCallback((qid: string) => {
    let isVisited = false
    for (const visitedQuestion of visitedQuestions) {
      if (visitedQuestion.qid === qid) {
        isVisited = true
        setQinfo(visitedQuestion.question)
        setOptions(visitedQuestion.options)
        const ansList = getMultipleRandom(visitedQuestion.answerCluster, 1)
        const disList = getMultipleRandom(visitedQuestion.distractorCluster, 3)
        const optionList = shuffle(
          ansList.map((a: any) => a.representative).concat(disList.map((d: any) => d.representative))
        )
        optionList.forEach((o: optionType, i: number) => {
          if (o.is_answer) {
            setAnswer(i)
          }
        })
        setOptionSet(optionList)
        break
      }
    }
    if (isVisited === false) {
      Get<LoadProblemDetailParams, LoadProblemDetailResults>(`${process.env.REACT_APP_BACK_END}/question/detail/load`, {
        qid: qid,
      }).then((res: LoadProblemDetailResults | null) => {
        if (res) {
          Get<LoadClusterParams, LoadClusterResults>(`${process.env.REACT_APP_BACK_END}/question/load/cluster`, {
            qid: qid,
          })
            .then((res2: LoadClusterResults | null) => {
              if (res2) {
                const cluster = res2.cluster
                const ans = cluster.filter((c: clusterType) => c.representative.is_answer)
                const dis = cluster.filter((c: clusterType) => !c.representative.is_answer)
                const ansList = getMultipleRandom(ans, 1)
                const disList = getMultipleRandom(dis, 3)

                const optionList = shuffle(
                  ansList.map((a: any) => a.representative).concat(disList.map((d: any) => d.representative))
                )

                setOptionSet(optionList)

                optionList.forEach((o: optionType, i: number) => {
                  if (o.is_answer) {
                    setAnswer(i)
                  }
                })

                setOptions(res.options)
                setQinfo(res.qinfo)
                dispatch(
                  addVisitedProblem({
                    qid: qid,
                    question: res.qinfo,
                    options: res.options,
                    answerCluster: ans,
                    distractorCluster: dis,
                  })
                )
              }
            })
            .catch(err => console.log(err))
        }
      })
    }
  }, [])

  const checkAnswer = useCallback(() => {
    if (!ansVisible) {
      optionSet &&
        selected &&
        Post<SolveQuestionParams, SolveQuestionResults>(`${process.env.REACT_APP_BACK_END}/question/solve`, {
          qid: qid,
          uid: uid,
          initAns: optionSet[selected]._id,
          isCorrect: selected === answer,
          optionSet: options.map((o: optionType) => ObjectID(o._id)),
        }).then((res: SolveQuestionResults | null) => {
          res && console.log('success:', res.success)
        })
    }
    setAnsVisible(!ansVisible)
  }, [ansVisible, qid, uid, optionSet, selected, answer, options])

  useEffect(() => {
    qid && getQinfo(qid)
  }, [getQinfo, qid])

  const shuffleOptions = useCallback(() => {
    qid && getQinfo(qid)
    setIsSolved(false)
    setSelected(-1)
    setAnsVisible(false)
    setShowAnswer(false)
  }, [])

  const toggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal)
    return ''
  }, [isOpenModal, setIsOpenModal])

  const reportSubmit = useCallback(
    async (msg: string) => {
      console.log(msg)
      toggleModal()
      // TODO: Link to the backend
    },
    [isOpenModal]
  )

  return (
    <QuestionBox>
      <ReturnBtn onClick={() => navigate('/' + cid)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Return to Question List
      </ReturnBtn>
      <Label>Q. {qinfo && JSON.parse(qinfo.stem_text).blocks[0].text}</Label>
      <div>
        {optionSet?.map((e: optionType, i: number) => {
          return (
            <OptionBtn
              onClick={() => {
                setSelected(i)
                setIsSolved(true)
              }}
              state={isSolved}
              selected={selected === i}
              key={i}
              isAnswer={showAnswer && answer === i ? true : false}
            >
              {e.option_text}
            </OptionBtn>
          )
        })}
      </div>
      <BtnDisplay>
        <FillBtn
          onClick={() => {
            checkAnswer()
            setShowAnswer(true)
          }}
          disabled={selected == -1}
        >
          Submit
        </FillBtn>
        <StrokeBtn onClick={shuffleOptions}>Shuffle Answers</StrokeBtn>
        <StrokeBtn onClick={toggleModal}>Report Errors</StrokeBtn>
        <InputDialog modalState={isOpenModal} submit={reportSubmit} toggleModal={toggleModal} />
      </BtnDisplay>
    </QuestionBox>
  )
}

const QuestionBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px;
  @media (max-width: 599px) {
    margin: 30px 0 30px 0;
  }
`

const ReturnBtn = styled.div`
  cursor: pointer;
  font-size: 15px;
  font-family: 'inter-m';
  color: #616161;
  :hover {
    color: #919191;
  }
`

const Label = styled.div`
  ${typography.hStem};
  padding: 8px 0 0 0;
  @media (max-width: 599px) {
    padding: 0px;
  }
`

const BtnDisplay = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`
