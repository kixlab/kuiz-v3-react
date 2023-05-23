import { LoadUserInfoParams, LoadUserInfoResults } from '@api/admin/loadUserInfo'
import { LoadClassInfoParams, LoadClassInfoResults } from '@api/loadClassInfo'
import { Label } from '@components/basic/Label'
import { Table } from '@components/basic/Table'
import { SelectInput } from '@components/basic/input/Select'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { User } from '@server/db/user'
import { request } from '@utils/api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Page() {
  const isAdmin = useSelector((state: RootState) => state.userInfo.isAdmin)
  const { push, query } = useRouter()
  const cid = query.cid as string
  const [users, setUsers] = useState<User[]>([])
  const [className, setClassName] = useState('')
  const [topics, setTopics] = useState<string[]>([])
  const [topic, setTopic] = useState<string>('All')

  const onSelectTopic = useCallback(
    (i: number) => {
      setTopic(topics[i])
    },
    [topics]
  )

  useEffect(() => {
    if (cid) {
      request<LoadClassInfoParams, LoadClassInfoResults>(`loadClassInfo`, { cid }).then(res => {
        if (res) {
          setTopics(['All', ...res.topics.map(t => t.label)])
        }
      })
    }
  }, [cid])

  useEffect(() => {
    if (cid) {
      request<LoadUserInfoParams, LoadUserInfoResults>(`admin/loadUserInfo`, {
        cid,
        topic: topic === 'All' ? undefined : topic,
      }).then(res => {
        if (res) {
          setUsers(res.students)
          setClassName(res.className)
        }
      })
    }
  }, [isAdmin, push, cid, setUsers, topic])

  return (
    <>
      {!isAdmin ? (
        <Label size={0}>403 Forbidden</Label>
      ) : (
        <>
          <Head>
            <title>{className}</title>
          </Head>
          <Container>
            <SelectInput options={topics} value={topic} onSelect={onSelectTopic} />
            <Table
              headers={['Name', 'Student ID', 'Email', 'Questions Made', 'Options Made']}
              rows={users.map(student => [
                student.name,
                student.studentID ? student.studentID : 'TBD',
                student.email,
                student.made.length,
                student.madeOptions.length,
              ])}
            />
          </Container>
        </>
      )}
    </>
  )
}

const Container = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`
