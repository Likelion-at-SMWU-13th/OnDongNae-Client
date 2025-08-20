import React from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import CourseRecommend from '@/components/course/CourseRecommend'
const CourseAI = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  handleGenerate(() => {
    navigate('user/course/loading')
  })
  return (
    <div>
      <Header img={backIcon} title={t('bottomNav.course')} showImg={false} />
      <CourseRecommend />
      <ButtonWrapper>
        <LargeOrangeButton label={t('button.generate')} onBtnClick={handleGenerate} />
      </ButtonWrapper>
      <CustomerBottomNav />
    </div>
  )
}

export default CourseAI
