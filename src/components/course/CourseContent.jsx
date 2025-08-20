import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const API_URL = import.meta.env.VITE_API_URL

export default function CourseContent() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get(`${API_URL}/courses`, {
          headers: { 'Accept-Language': lang },
        })
        // ✅ 응답: { code, message, success, data: [...] }
        const list = Array.isArray(res.data?.data) ? res.data.data : []
        setCourses(list)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  if (loading) return <Empty>불러오는 중…</Empty>
  if (error) return <Empty>{error}</Empty>
  if (!courses.length) return <Empty>코스가 없습니다.</Empty>

  return (
    <ContentWrapper>
      <Title>{t('bottomNav.course')}</Title>
      {courses.map((c) => (
        <Card key={c.id} onClick={() => navigate(`/user/map/store/${c.id}`)}>
          <CardMain>
            <CourseInfo>
              <CourseTitle>{c.courseTitle}</CourseTitle>
              <CourseDescription>{c.courseDescription}</CourseDescription>
            </CourseInfo>
            <StoreImg src={c.mainImageUrl}></StoreImg>
          </CardMain>
          <CommentTxt>{(c.storeNames ?? []).join(', ')}</CommentTxt>
        </Card>
      ))}
    </ContentWrapper>
  )
}

/* styles */
const Title = styled.p`
  padding: 20px 0 20px 29px;
  color: #000;
  font-feature-settings: 'dlig' on;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
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
  padding: 0px 10px 10px 20px;
  cursor: pointer;
  &:hover {
    background: #f8c4b6;
  }
`
const CourseInfo = styled.div`
  margin-bottom: 5px;
`
const CourseTitle = styled.div`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.408px;
`
const CourseDescription = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
`
const CommentTxt = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
  color: #000;
  font-size: 13px;
  font-weight: 400;
  line-height: 22px; /* 169.231% */
`
const CardMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 77.43%;
  /* gap: 12.3%; */
  margin: 0 auto;
`
const StoreImg = styled.img`
  width: 90px;
  height: 90px;
`
const Empty = styled.p`
  padding: 24px 16px;
  color: #777;
  font-size: 14px;
  text-align: center;
`
