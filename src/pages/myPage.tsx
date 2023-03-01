import { StrokeBtn } from '@components/basic/button/Button'
import { Label } from '@components/basic/Label'
import { MadeOption } from '@components/MadeOption'
import { MadeStem } from '@components/MadeStem'
import styled from '@emotion/styled'
import { logout } from '@redux/features/userSlice'
import { RootState } from '@redux/store'
import { Option } from '@server/db/option'
import { QStem } from '@server/db/qstem'
import { palette, typography } from '@styles/theme'
import { request } from '@utils/api'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetQstemByOptionParams, GetQstemByOptionResults } from './api/question/getQstemByOption'
import { LoadCreatedStemDataParams, LoadCreatedStemDataResults } from './api/question/loadCreatedStemData'
import { LoadCreatedOptionParams, LoadCreatedOptionResults } from './api/question/option/loadCreatedOption'

export default function Page() {
  const { push } = useRouter()
  const dispatch = useDispatch()
  const uid = useSelector((state: RootState) => state.userInfo?._id)
  const [madeStem, setMadeStem] = useState<QStem[]>([])
  const [madeOption, setMadeOption] = useState<(Option & { qinfo: QStem })[]>([])

  const getMadeStem = useCallback(() => {
    request<LoadCreatedStemDataParams, LoadCreatedStemDataResults>(`question/made/stem`, { uid: uid }).then(res => {
      if (res) {
        setMadeStem(res.madeStem.reverse())
      }
    })
  }, [uid])
  const getMadeOption = useCallback(() => {
    request<LoadCreatedOptionParams, LoadCreatedOptionResults>(`question/made/option`, {
      uid: uid,
    }).then(res => {
      if (res) {
        request<GetQstemByOptionParams, GetQstemByOptionResults>(`question/qstembyoption`, {
          qstems: res.madeOption.map(o => o.qstem.toString()),
        }).then(res2 => {
          if (res2) {
            const optionList = res.madeOption
            const qlist = res2.qstems.map(qstem => {
              return { qinfo: qstem }
            })
            const newOptionList = optionList.map((option, index) => ({
              ...option,
              ...qlist[index],
            }))
            setMadeOption(newOptionList.reverse())
          }
        })
      }
    })
  }, [uid])

  const logOut = useCallback(() => {
    signOut()
    dispatch(logout())
    push('/')
  }, [dispatch, push])

  useEffect(() => {
    getMadeStem()
    getMadeOption()
  }, [getMadeOption, getMadeStem])

  return (
    <div>
      <div>
        <DataLabel>
          <Label text="Created Question Stems" color="black" size={0} />
        </DataLabel>
        <MadeLists>
          {madeStem.map(stem => {
            return <MadeStem key={stem._id} qid={stem._id} question={stem.raw_string} />
          })}
        </MadeLists>
      </div>
      <div>
        <DataLabel>
          <Label text="Created Options" color="black" size={0} />
        </DataLabel>
        <MadeLists>
          {madeOption.map(option => {
            return (
              <MadeOption
                key={option._id}
                optionType={option.is_answer ? 'Answer' : 'Distractor'}
                qid={option.qinfo._id}
                question={option.qinfo.raw_string}
                option={option.option_text}
              />
            )
          })}
        </MadeLists>
      </div>
      <StrokeBtn onClick={logOut}>Log out</StrokeBtn>
    </div>
  )
}

const MadeLists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
`

const DataLabel = styled.div`
  ${typography.hLabel};
  color: ${palette.primary.main};
  padding: 30px 0 12px;
  display: flex;
  gap: 10px;
`
