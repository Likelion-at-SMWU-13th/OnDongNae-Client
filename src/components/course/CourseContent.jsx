import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import authAxios from '@/lib/authAxios'
import LoadingSpinner from '@/components/common/Loading'

const API_URL = import.meta.env.VITE_API_URL

export default function CourseContent() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    ;(async () => {
      const lang = (i18n.language || 'en').split('-')[0]
      setLoading(true)
      setError(null)
      try {
        const res = await authAxios.get(`${API_URL}/courses`, {
          headers: { 'Accept-Language': lang },
        })
        const list = Array.isArray(res.data?.data) ? res.data.data : []
        setCourses(list)
      } catch (e) {
        setError(t('course.fail') || '불러오는 데에 실패했습니다')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <LoadingSpinner text={t('course.connect')} />
  if (error) return <Empty>{error}</Empty>
  if (!courses.length) return <Empty>{t('course.fail')}</Empty>

  return (
    <>
      <Title>{t('course.suggestCourse')}</Title>
      <ContentWrapper>
        {courses.map(
          ({ id: courseId, courseTitle, courseDescription, mainImageUrl, storeNames }) => (
            <Card key={courseId} onClick={() => navigate(`/user/course/detail/${courseId}`)}>
              <CardMain>
                <CourseInfo>
                  <CourseTitle>{courseTitle}</CourseTitle>
                  <CourseDescription>{courseDescription}</CourseDescription>
                </CourseInfo>
                <StoreImg src={mainImageUrl}></StoreImg>
              </CardMain>
              <CommentTxt>{(storeNames ?? []).join(', ')}</CommentTxt>
            </Card>
          ),
        )}
      </ContentWrapper>
    </>
  )
}

const Title = styled.p`
  padding: 20px 0 20px 29px;
  font-feature-settings: 'dlig' on;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`
const Card = styled.div`
  width: 330px;
  min-height: 143px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #ffffff;
  border: solid 2px #f8c4b6;
  text-align: left;
  padding: 10px 19px 10px 14px;
  cursor: pointer;
  transition: 0.5s ease;
  &:hover {
    background: #f8c4b6;
  }
`
const CourseInfo = styled.div`
  margin-bottom: 5px;
`
const CourseTitle = styled.div`
  color: #000;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.408px;
`
const CourseDescription = styled.div`
  color: #323232;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 157.143% */
`
const CommentTxt = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
  color: #717171;
  font-size: 13px;
  font-weight: 400;
  line-height: 22px; /* 169.231% */
`
const CardMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 5%;
`
const StoreImg = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 10px;
`
const Empty = styled.p`
  padding: 24px 16px;
  color: #777;
  font-size: 14px;
  text-align: center;
`
