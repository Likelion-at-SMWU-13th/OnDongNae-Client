import React from 'react'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import CourseContent from '@/components/course/CourseContent'
const TitleWrapper = styled.div`
  padding: 20px 0px 20px 30px;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const CoursePage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Header img={backIcon} title={t('bottomNav.course')} showImg={false} />
      <TitleWrapper>{t('bottomNav.course')}</TitleWrapper>
      <CourseContent />
      <ButtonWrapper>
        <LargeOrangeButton
          label={t('bottomNav.course')}
          onBtnClick={() => window.location.replace('/user/course/AI')}
        />
      </ButtonWrapper>
      <CustomerBottomNav />
    </div>
  )
}

export default CoursePage
