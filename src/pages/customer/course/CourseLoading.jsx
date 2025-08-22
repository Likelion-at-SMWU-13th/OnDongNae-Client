import styled from 'styled-components'
import Header from '@/components/common/Header'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Spinner from '@/assets/icon-spinner.svg'
import SubTitle from '@/components/signup/SubTitle'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import axios from 'axios'

const CourseLoading = () => {
  const { t, i18n } = useTranslation()
  const { state } = useLocation()
  const API_URL = import.meta.env.VITE_API_URL
  //   const [courses, setCourses] = useState([])
  const navigate = useNavigate()
  console.log(state) // 연동 후 삭제
  // { marketId: 5, withOptionId: 2, atmosphereOptionId: 9 }

  useEffect(() => {
    const lang = (i18n.language || 'en').split('-')[0]

    axios
      .post(`${API_URL}/courses/recommend`, state, {
        headers: { 'Accept-Language': lang },
      })
      .then((res) => {
        console.log(res)
        navigate('/user/course/result', { state: res.data.data })
      })
      .catch((err) => {
        console.error(err)
        navigate('/user/course/AI/fail')
      })
  }, [])

  return (
    <div>
      <Header title={t('bottomNav.course')} showImg={false} />
      <ContentWrapper>
        <SpinnerIcon src={Spinner} alt='로딩중' />
        <SubTitle text={t('course.loading')} />
      </ContentWrapper>
      <CustomerBottomNav />
    </div>
  )
}
export default CourseLoading

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SpinnerIcon = styled.img`
  margin: 164px 0 40px 0;
  width: 119px;
`
