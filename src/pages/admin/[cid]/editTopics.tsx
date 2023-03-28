import { Label } from '@components/basic/Label'
import { RootState } from '@redux/store'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { request } from '@utils/api'
import { LoadClassInfoParams, LoadClassInfoResults } from '@api/admin/loadClassInfo'
import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { TABLET_WIDTH_THRESHOLD } from 'src/constants/ui'
import { FillBtn } from '@components/basic/button/Button'
import { UpdateTopicInfoParams, UpdateTopicInfoResults } from '@api/admin/updateTopicInfo'
import { UpdateTopicDialog } from '@components/Dialogs/updateTopicDialog'
import { CheckDialog } from '@components/Dialogs/CheckDialog'

export default function Page() {
  const isAdmin = useSelector((state: RootState) => state.userInfo.isAdmin)
  const { push, query } = useRouter()
  const cid = query.cid as string
  const [classInfo, setClassInfo] = useState<LoadClassInfoResults>()
  const [topics, setTopics] = useState<string[]>([])

  //create update modal data
  const [modalOpen, setModalOpen] = useState(false)
  const [initialModalText, setInitialModalText] = useState('')
  const [modalState, setModalState] = useState<'Update' | 'Create' | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  //delete modal data
  const [checkDelete, setCheckDelete] = useState(false)

  useEffect(() => {
    if (!isAdmin) {
      push('/')
    } else {
      if (cid) {
        request<LoadClassInfoParams, LoadClassInfoResults>(`admin/loadClassInfo`, { cid }).then(res => {
          if (res) {
            setClassInfo(res)
            setTopics(res.topics)
          }
        })
      }
    }
  }, [isAdmin, push, cid, setClassInfo])

  const updateDataBaseTopics = useCallback(
    (topics: string[]) => {
      if (cid) {
        request<UpdateTopicInfoParams, UpdateTopicInfoResults>(`admin/updateTopicInfo`, { cid, topics }).then(res => {
          if (res) {
            setTopics(res.topics)
          }
        })
      }
    },
    [cid]
  )

  const onUpdateTopic = useCallback(
    (index: number) => {
      setModalState('Update')
      setInitialModalText(topics[index])
      setModalOpen(true)
      setCurrentIndex(index)
    },
    [setModalOpen, setModalState, setInitialModalText, topics]
  )

  const onDeleteTopic = useCallback(
    (index: number) => {
      setCurrentIndex(index)
      setInitialModalText(topics[index])
      setCheckDelete(true)
    },
    [setCurrentIndex, setInitialModalText, topics, setCheckDelete]
  )

  const onAddNewTopic = useCallback(() => {
    setModalState('Create')
    setModalOpen(true)
  }, [setModalOpen, setModalState])

  const modalSubmit = useCallback(
    (res = '') => {
      setModalOpen(false)
      setCheckDelete(false)
      if (modalState === 'Update' && res.trim().length > 0 && typeof currentIndex === 'number') {
        setTopics((previousState: string[]) => {
          previousState[currentIndex] = res
          updateDataBaseTopics(previousState)
          return previousState
        })
        setCurrentIndex(null)
        setModalState(null)
      } else if (modalState === 'Create' && res.trim().length > 0) {
        setTopics((previousState: string[]) => {
          previousState.push(res)
          updateDataBaseTopics(previousState)
          return previousState
        })
      } else {
        if (typeof currentIndex === 'number') {
          setTopics((previousState: string[]) => {
            previousState.splice(currentIndex, 1)
            updateDataBaseTopics(previousState)
            return previousState
          })
          setCurrentIndex(null)
          setModalState(null)
        }
      }
    },
    [setModalOpen, modalState, setTopics, currentIndex, updateDataBaseTopics]
  )

  return (
    <>
      {!isAdmin ? (
        <Label color="black" size={0}>
          403 Forbidden
        </Label>
      ) : (
        <Container>
          <UpdateTopicDialog
            modalState={modalOpen}
            initialText={initialModalText}
            state={modalState}
            submit={modalSubmit}
          />
          <CheckDialog
            title="Delete Topic"
            message={`Are you sure you want to delete "${initialModalText}"`}
            modalState={checkDelete}
            btnName="Yes"
            toggleModal={modalSubmit}
            cancelModal={() => {
              setCheckDelete(!checkDelete)
            }}
          />
          <Header>{classInfo?.name}</Header>
          <Table>
            <TableHeader>
              <Col>Topic</Col>
              <Col>Update</Col>
              <Col>Delete</Col>
            </TableHeader>
            {topics?.map((topic: string, index: number) => {
              return (
                <TableRow key={index}>
                  <Col>{topic}</Col>
                  <Col>
                    <FillBtn onClick={() => onUpdateTopic(index)}>Update</FillBtn>
                  </Col>
                  <Col>
                    <FillBtn onClick={() => onDeleteTopic(index)}>Delete</FillBtn>
                  </Col>
                </TableRow>
              )
            })}
          </Table>
          <FillBtn onClick={onAddNewTopic}>Add New Topic</FillBtn>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  ${typography.b03b}
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`

const Header = styled.h2`
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
`

const Table = styled.ul`
  li {
    border-radius: 3px;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }
  @media all and (max-width: ${TABLET_WIDTH_THRESHOLD}px) {
    li {
      display: block;
    }
  }
`
const TableHeader = styled.li`
  background-color: ${palette.primary.dark};
  color: ${palette.common.white};
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  @media all and (max-width: ${TABLET_WIDTH_THRESHOLD}px) {
    display: none;
  }
`

const TableRow = styled.li`
  background-color: ${palette.common.white};
  box-shadow: 0px 0px 9px 0px ${palette.background.dark};
`

const Col = styled.div`
  flex-basis: 33%;
  @media all and (max-width: ${TABLET_WIDTH_THRESHOLD}px) {
    flex-basis: 100%;
    display: flex;
    padding: 10px 0;
    &:before {
      color: ${palette.common.white};
      padding-right: 10px;
      flex-basis: 50%;
      text-align: right;
    }
  }
`
