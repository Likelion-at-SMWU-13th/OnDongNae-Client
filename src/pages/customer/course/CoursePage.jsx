import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import * as C from '@/styles/common/CustomerBottomNav.styles'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import CourseContent from '@/components/course/CourseContent'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'

const CoursePage = () => {
  const { t } = useTranslation()
  return (
    <>
      <Header title={t('bottomNav.course')} showImg={false} />
      <C.Main>
        <C.Scroll className='scrollable'>
          <CourseContent />
          <ButtonWrapper>
            <LargeOrangeButton
              label={t('course.create')}
              onBtnClick={() => window.location.replace('/user/course/AI')}
            />
          </ButtonWrapper>
        </C.Scroll>
      </C.Main>
      <CustomerBottomNav />
    </>
  )
}

export default CoursePage

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
  margin: 30px 0;
`
