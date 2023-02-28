import { FillBtn, StrokeBtn } from '@components/basic/button/Button'
import { OptionBtn } from '@components/basic/button/OptionButton'
import { InputDialog } from '@components/Dialogs/InputDialog'
import styled from '@emotion/styled'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RootState } from '@redux/store'
import { Option } from '@server/db/option'
import { QStem } from '@server/db/qstem'
import { typography } from '@styles/theme'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LoadClusterParams, LoadClusterResults } from 'src/pages/api/question/cluster/loadCluster'
import { LoadProblemDetailParams, LoadProblemDetailResults } from 'src/pages/api/question/loadProblemDetail'
import { SolveQuestionParams, SolveQuestionResults } from 'src/pages/api/question/solveQuestion'

export default function Page() {
  const { push, query } = useRouter()
  const qid = query.id as string | undefined
  const cid = query.cid as string | undefined
  const uid = useSelector((state: RootState) => state.userInfo._id)
  const [optionSet, setOptionSet] = useState<Option[]>()
  const [options, setOptions] = useState<Option[]>([])
  const [qinfo, setQinfo] = useState<QStem>()
  const [ansVisible, setAnsVisible] = useState(true)
  const [selected, setSelected] = useState<number>()
  const [answer, setAnswer] = useState(0)
  const [isSolved, setIsSolved] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const getMultipleRandom = useCallback((arr: LoadClusterResults['cluster'], num: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, num)
  }, [])

  const shuffle = useCallback((array: Option[]) => {
    array.sort(() => Math.random() - 0.5)
    return array
  }, [])

  const getQinfo = useCallback(
    (qid: string) => {
      request<LoadProblemDetailParams, LoadProblemDetailResults>(`question/detail/load`, {
        qid,
      }).then(res => {
        if (res) {
          request<LoadClusterParams, LoadClusterResults>(`question/load/cluster`, {
            qid,
          })
            .then(res2 => {
              if (res2) {
                const cluster = res2.cluster
                const ans = cluster.filter(c => c.representative.is_answer)
                const dis = cluster.filter(c => !c.representative.is_answer)
                const ansList = getMultipleRandom(ans, 1)
                const disList = getMultipleRandom(dis, 3)

                const optionList = shuffle(
                  ansList.map(a => a.representative).concat(disList.map(d => d.representative))
                )

                setOptionSet(optionList)
                optionList.forEach((o, i) => {
                  if (o.is_answer) {
                    setAnswer(i)
                  }
                })
              }

              setOptions(res.options)
              setQinfo(res.qinfo)
            })
            .catch(err => console.log(err))
        }
      })
    },
    [getMultipleRandom, shuffle]
  )

  const checkAnswer = useCallback(() => {
    if (!ansVisible && optionSet && selected && qid) {
      request<SolveQuestionParams, SolveQuestionResults>(`question/solve`, {
        qid,
        uid: uid,
        initAns: optionSet[selected]._id,
        isCorrect: selected === answer,
        optionSet: options.map(o => o._id),
      }).then((res: SolveQuestionResults | null) => {
        res && console.log('success:', res.success)
      })
    }
    setAnsVisible(!ansVisible)
  }, [ansVisible, qid, uid, optionSet, selected, answer, options])

  useEffect(() => {
    if (qid) {
      getQinfo(qid)
    }
  }, [getQinfo, qid])

  const shuffleOptions = useCallback(() => {
    if (qid) {
      getQinfo(qid)
      setIsSolved(false)
      setSelected(-1)
      setAnsVisible(false)
      setShowAnswer(false)
    }
  }, [getQinfo, qid])

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
    [toggleModal]
  )

  return (
    <QuestionBox>
      <ReturnBtn onClick={() => push('/' + cid)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Return to Question List
      </ReturnBtn>
      <Label>Q. {qinfo && JSON.parse(qinfo.stem_text).blocks[0].text}</Label>
      <div>
        {optionSet?.map((e, i) => {
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
          disabled={selected == null}
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
