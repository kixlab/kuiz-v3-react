import { StrokeBtn } from '@components/basic/button/Button'
import { Label } from '@components/basic/Label'
import { MadeOption } from '@components/MadeOption'
import { MadeStem } from '@components/MadeStem'
import styled from '@emotion/styled'
import { logout } from '@redux/features/userSlice'
import { QStem } from '@server/db/qstem'
import { palette, typography } from '@styles/theme'
import { request } from '@utils/api'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetQstemByOptionParams, GetQstemByOptionResults } from './api/getQstemByOption'
import { LoadCreatedStemDataParams, LoadCreatedStemDataResults } from './api/loadCreatedStemData'
import { LoadCreatedOptionParams, LoadCreatedOptionResults } from './api/loadCreatedOption'
import { FloatingButton } from '@components/basic/button/Floating'
import { RootState } from '@redux/store'

export default function Page() {
  const studentID = useSelector((state: RootState) => state.userInfo.studentID)
  const { push } = useRouter()
  const dispatch = useDispatch()
  const [madeStem, setMadeStem] = useState<QStem[]>([])
  const [madeOption, setMadeOption] = useState<
    { qid: string; stemText: string; optionText: string; isAnswer: boolean }[]
  >([])
  const [registeredStudentID, setRegisteredStudentID] = useState(false)

  const getMadeStem = useCallback(() => {
    request<LoadCreatedStemDataParams, LoadCreatedStemDataResults>(`loadCreatedStemData`, {}).then(res => {
      if (res) {
        setMadeStem(res.madeStem.reverse())
      }
    })
  }, [])

  const getMadeOption = useCallback(async () => {
    const res = await request<LoadCreatedOptionParams, LoadCreatedOptionResults>(`loadCreatedOption`, {})
    if (res) {
      const res2 = await request<GetQstemByOptionParams, GetQstemByOptionResults>(`getQstemByOption`, {
        qstems: res.madeOption.map(o => o.qstem.toString()),
      })
      if (res2) {
        const optionList = res.madeOption
        const qlist = res2.qstems
        const newOptionList = optionList.map((option, index) => ({
          qid: qlist[index]._id,
          stemText: qlist[index].stem_text,
          optionText: option.option_text,
          isAnswer: option.is_answer,
        }))
        setMadeOption(newOptionList.reverse())
      }
    }
  }, [])

  const onInsertStudentID = () => {
    push('/register')
  }
  const logOut = useCallback(() => {
    signOut()
    dispatch(logout())
    push('/')
  }, [dispatch, push])

  useEffect(() => {
    studentID === '' ? setRegisteredStudentID(true) : setRegisteredStudentID(false)
    getMadeStem()
    getMadeOption()
  }, [getMadeOption, getMadeStem, setRegisteredStudentID, studentID])

  return (
    <Container>
      <DataLabel>
        <Label text="My Questions" color="black" size={0} />
      </DataLabel>
      <MadeLists>
        {madeStem.map(stem => {
          return <MadeStem key={stem._id} qid={stem._id} question={stem.stem_text} />
        })}
      </MadeLists>
      <DataLabel>
        <Label text="My Options" color="black" size={0} />
      </DataLabel>
      <MadeLists>
        {madeOption.map((option, i) => {
          return (
            <MadeOption
              key={i}
              optionType={option.isAnswer ? 'Answer' : 'Distractor'}
              qid={option.qid}
              question={option.stemText}
              option={option.optionText}
            />
          )
        })}
      </MadeLists>
      <FloatingButton onClick={onInsertStudentID}>
        {registeredStudentID ? 'Add Student ID' : 'Update Student ID'}
      </FloatingButton>
      <StrokeBtn onClick={logOut}>Log out</StrokeBtn>
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
`

const MadeLists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
`

const DataLabel = styled.div`
  ${typography.hLabel};
  color: ${palette.primary.main};
`
