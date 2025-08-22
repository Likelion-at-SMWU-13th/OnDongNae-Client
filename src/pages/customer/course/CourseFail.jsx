import React from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import warning from '@/assets/icon-warning.svg'
import { useTranslation } from 'react-i18next'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import { useNavigate } from 'react-router-dom'

const CourseFail = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleGenerate = () => {
    navigate('/user/course/AI')
  }
  return (
    <div>
      <Header title={t('bottomNav.course')} showImg={true} />
      <Content>
        <FailIcon src={warning} />
        <Comment>{t('course.failComment')}</Comment>
        <RegenerateBtn onClick={handleGenerate}>{t('course.regenerate')}</RegenerateBtn>
      </Content>
      <CustomerBottomNav />
    </div>
  )
}

export default CourseFail

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`
const FailIcon = styled.img`
  width: 96px;
  margin: 164px 0 40px 0;
`
const Comment = styled.p`
  color: #000;
  font-size: 19px;
  font-weight: 500;
  line-height: 22px; /* 115.789% */
  letter-spacing: -0.408px;
  white-space: pre-line;
`
const RegenerateBtn = styled.button`
  width: 125px;
  height: 43px;
  margin-top: 25px;
  border-radius: 20px;
  border: 1px solid #f08e67;
  background: #f08e67;
  color: #fff;
`
