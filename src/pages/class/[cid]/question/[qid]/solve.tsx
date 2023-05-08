import { GetContributorsParams, GetContributorsResults } from '@api/getContributors'
import { LoadClusterParams, LoadClusterResults } from '@api/loadCluster'
import { LoadQuestionDetailParams, LoadQuestionDetailResults } from '@api/loadQuestionDetail'
import { SolveQuestionParams, SolveQuestionResults } from '@api/solveQuestion'
import { InputDialog } from '@components/Dialogs/InputDialog'
import { Divider } from '@components/Divider'
import { Sheet } from '@components/Sheet'
import { Label } from '@components/basic/Label'
import { FillButton } from '@components/basic/button/Fill'
import { OptionButton } from '@components/basic/button/Option'
import { StrokeButton } from '@components/basic/button/Stroke'
import styled from '@emotion/styled'
import { Option } from '@server/db/option'
import { QStem } from '@server/db/qstem'
import { typography } from '@styles/theme'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export default function Page() {
  const { query } = useRouter()
  const qid = query.qid as string | undefined
  const [optionSet, setOptionSet] = useState<Option[]>()
  const [options, setOptions] = useState<Option[]>([])
  const [qinfo, setQinfo] = useState<QStem>()
  const [ansVisible, setAnsVisible] = useState(true)
  const [selected, setSelected] = useState<number>(-1)
  const [answer, setAnswer] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [contributors, setContributors] = useState<GetContributorsResults>()

  const getMultipleRandom = useCallback((arr: LoadClusterResults['cluster'], num: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, num)
  }, [])

  const shuffle = useCallback((array: Option[]) => {
    array.sort(() => Math.random() - 0.5)
    return array
  }, [])

  const getQinfo = useCallback(
    async (qid: string) => {
      const res = await request<LoadQuestionDetailParams, LoadQuestionDetailResults>(`loadQuestionDetail`, {
        qid,
      })

      const contributorData = await request<GetContributorsParams, GetContributorsResults>(`getContributors`, {
        qid,
      })
      if (contributorData) {
        setContributors(contributorData)
      }

      if (res) {
        const res2 = await request<LoadClusterParams, LoadClusterResults>(`loadCluster`, {
          qid,
        })
        if (res2) {
          const cluster = res2.cluster
          const ans = cluster.filter(c => c.representative.is_answer)
          const dis = cluster.filter(c => !c.representative.is_answer)
          const ansList = getMultipleRandom(ans, 1)
          const disList = getMultipleRandom(dis, 3)

          const optionList = shuffle(ansList.map(a => a.representative).concat(disList.map(d => d.representative)))

          setOptionSet(optionList)
          optionList.forEach((o, i) => {
            if (o.is_answer) {
              setAnswer(i)
            }
          })
        }

        setOptions(res.options)
        setQinfo(res.qinfo)
      }
    },
    [getMultipleRandom, shuffle]
  )

  const checkAnswer = useCallback(async () => {
    if (!ansVisible && optionSet && selected && qid) {
      await request<SolveQuestionParams, SolveQuestionResults>(`solveQuestion`, {
        qid,
        initAns: optionSet[selected]._id,
        isCorrect: selected === answer,
        optionSet: options.map(o => o._id),
      })
    }
    setAnsVisible(!ansVisible)
  }, [ansVisible, qid, optionSet, selected, answer, options])

  useEffect(() => {
    if (qid) {
      getQinfo(qid)
    }
  }, [getQinfo, qid])

  const shuffleOptions = useCallback(() => {
    if (qid) {
      getQinfo(qid)
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
      toggleModal()
      // TODO: Link to the backend
    },
    [toggleModal]
  )

  return (
    <>
      <Sheet gap={0} marginBottom={10}>
        <Label color="grey200" marginBottom={8}>
          Contributors
        </Label>
        <Contributors>
          {contributors?.userData?.map(
            (contributor, index: number) =>
              contributor.img && <ProfileImg src={contributor.img} key={index} title={contributor.name}></ProfileImg>
          )}
        </Contributors>
        <Divider marginVertical={20} />
        <Label color="grey200" marginBottom={16}>
          Q. {qinfo?.stem_text}
        </Label>
        <div>
          {optionSet?.map((e, i) => {
            return (
              <OptionButton
                onClick={() => {
                  setSelected(i)
                }}
                state={0 <= selected}
                selected={selected === i}
                key={i}
                isAnswer={showAnswer && answer === i}
                marginBottom={8}
              >
                {e.option_text}
              </OptionButton>
            )
          })}
        </div>
        <BtnDisplay>
          <FillButton
            onClick={() => {
              checkAnswer()
              setShowAnswer(true)
            }}
            disabled={selected == -1}
          >
            Submit
          </FillButton>
          <StrokeButton onClick={shuffleOptions}>Shuffle Options</StrokeButton>
          <StrokeButton onClick={toggleModal}>Report Error</StrokeButton>
          <InputDialog modalState={isOpenModal} submit={reportSubmit} toggleModal={toggleModal} />
        </BtnDisplay>
      </Sheet>
      {showAnswer && (
        <Sheet gap={0}>
          <Label color="grey200" marginBottom={8}>
            Learning Objective
          </Label>
          <Text>{qinfo?.learningObjective}</Text>
          <Label color="grey200" marginBottom={8}>
            Explanation
          </Label>
          <Text>{qinfo?.explanation}</Text>
        </Sheet>
      )}
    </>
  )
}

const Text = styled.p`
  ${typography.b02};
  margin: 10px;
`

const BtnDisplay = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: 20px;
`

const Contributors = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 4px;
`

const ProfileImg = styled.img`
  border-radius: 50%;
  display: flex;
  width: 28px;
  height: 28px;
  margin: 3px;
`
