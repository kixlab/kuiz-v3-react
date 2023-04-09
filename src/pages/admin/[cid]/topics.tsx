import { CreateTopicParams, CreateTopicResults } from '@api/admin/createTopic'
import { DeleteTopicParams, DeleteTopicResults } from '@api/admin/deleteTopic'
import { LoadClassInfoParams, LoadClassInfoResults } from '@api/admin/loadClassInfo'
import { UpdateTopicParams, UpdateTopicResults } from '@api/admin/updateTopic'
import { UpdateTopicDialog } from '@components/Dialogs/updateTopicDialog'
import { Label } from '@components/basic/Label'
import { FillButton } from '@components/basic/button/Fill'
import { TextButton } from '@components/basic/button/Text'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { Topic } from '@server/db/topic'
import { palette, typography } from '@styles/theme'
import { request } from '@utils/api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TABLET_WIDTH_THRESHOLD } from 'src/constants/ui'

export default function Page() {
  const isAdmin = useSelector((state: RootState) => state.userInfo.isAdmin)
  const { push, query } = useRouter()
  const cid = query.cid as string
  const [classInfo, setClassInfo] = useState<LoadClassInfoResults>()
  const [topics, setTopics] = useState<Topic[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  useEffect(() => {
    if (cid) {
      request<LoadClassInfoParams, LoadClassInfoResults>(`admin/loadClassInfo`, { cid }).then(res => {
        if (res) {
          setClassInfo(res)
          setTopics(res.topics)
        }
      })
    }
  }, [push, cid, setClassInfo, setTopics])

  const onUpdateTopic = useCallback(
    (index: number) => {
      setModalOpen(true)
      setCurrentIndex(index)
    },
    [setModalOpen]
  )

  const onDeleteTopic = useCallback(
    async (index: number) => {
      if (confirm(`Are you sure you want to delete "${topics[index].label}"`)) {
        const res = await request<DeleteTopicParams, DeleteTopicResults>('admin/deleteTopic', {
          tid: topics[index]._id,
        })
        if (res) {
          const updatedTopicList = [...topics]
          updatedTopicList.splice(index, 1)
          setTopics(updatedTopicList)
        }
      }
    },
    [topics]
  )

  const onAddNewTopic = useCallback(() => {
    setModalOpen(true)
    setCurrentIndex(null)
  }, [setModalOpen])

  const modalSubmit = useCallback(
    async (label: string, requiredOptionNumber: number, requiredQuestionNumber: number) => {
      setModalOpen(false)
      if (currentIndex !== null) {
        const updatedTopic = {
          ...topics[currentIndex],
          label,
          requiredOptionNumber,
          requiredQuestionNumber,
        }
        const res = await request<UpdateTopicParams, UpdateTopicResults>('admin/updateTopic', {
          topic: updatedTopic,
        })
        if (res) {
          const updatedTopicList = [...topics]
          updatedTopicList[currentIndex] = updatedTopic
          setTopics(updatedTopicList)
        }
      } else {
        const res = await request<CreateTopicParams, CreateTopicResults>('admin/createTopic', {
          cid,
          label,
          requiredOptionNumber,
          requiredQuestionNumber,
        })
        if (res) {
          setTopics([...topics, res.topic])
        }
      }
    },
    [currentIndex, topics, cid]
  )

  return (
    <>
      {!isAdmin ? (
        <Label size={0}>403 Forbidden</Label>
      ) : (
        <>
          <Head>
            <title>{classInfo?.name}</title>
          </Head>
          <Container>
            {modalOpen && <UpdateTopicDialog submit={modalSubmit} cancel={() => setModalOpen(false)} />}
            <Table>
              <TableHeader>
                <Col>Topic</Col>
                <Col>Update</Col>
                <Col>Delete</Col>
              </TableHeader>
              {topics.map((topic, index) => {
                return (
                  <TableRow key={index}>
                    <Col>{topic.label}</Col>
                    <TextButton color={palette.primaryDark} onClick={() => onUpdateTopic(index)}>
                      Update
                    </TextButton>
                    <TextButton color={palette.primaryDark} onClick={() => onDeleteTopic(index)}>
                      Delete
                    </TextButton>
                  </TableRow>
                )
              })}
            </Table>
            <FillButton onClick={onAddNewTopic} marginTop={20}>
              Add New Topic
            </FillButton>
          </Container>
        </>
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

const Table = styled.ul`
  li {
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
  }
`

const TableHeader = styled.li`
  background-color: ${palette.primaryDark};
  color: ${palette.common.white};
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  @media all and (max-width: ${TABLET_WIDTH_THRESHOLD}px) {
    font-size: 12px;
  }
`

const TableRow = styled.li`
  background-color: ${palette.common.white};
  /* box-shadow: 0px 0px 9px 0px ${palette.background.dark}; */
`

const Col = styled.div`
  flex-basis: 33%;
  align-items: center;
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
