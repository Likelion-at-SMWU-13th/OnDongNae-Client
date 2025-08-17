import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export default function CourseContent() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get(`${API_URL}/courses`)
        // ✅ 응답: { code, message, success, data: [...] }
        const list = Array.isArray(res.data?.data) ? res.data.data : []
        setCourses(list)
      } catch (e) {
        console.error(e)
        setError('코스를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div>불러오는 중…</div>
  if (error) return <div>{error}</div>
  if (!courses.length) return <div>코스가 없습니다.</div>

  return (
    <ContentWrapper>
      {courses.map((c) => (
        <Card key={c.id} onClick={() => navigate(`/user/map/store/${c.id}`)}>
          <MetaInfo>
            <Author>{c.courseTitle}</Author>
            <Time>{c.courseDescription}</Time>
          </MetaInfo>
          <CommentTxt>{(c.storeNames ?? []).join(', ')}</CommentTxt>
        </Card>
      ))}
    </ContentWrapper>
  )
}

/* styles */
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const Card = styled.div`
  width: 330px;
  min-height: 143px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fdd8ca;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f8c4b6;
  }
`
const MetaInfo = styled.div`
  margin-bottom: 5px;
`
const Author = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #1a0f0f;
`
const Time = styled.div`
  font-size: 12px;
  color: #6c6c6c;
`
const CommentTxt = styled.div`
  font-size: 14px;
  color: #1a0f0f;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 5px;
  font-weight: 500;
`
