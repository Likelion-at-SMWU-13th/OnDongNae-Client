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
  margin: 30px 0;
`
export const Main = styled.main`
  height: calc(100dvh - 155px);
  display: flex;
  flex-direction: column;
  min-height: 0;
`
export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 80px);
`
const CoursePage = () => {
  const { t } = useTranslation()
  return (
    <div className='scrollable'>
      <Header img={backIcon} title={t('bottomNav.course')} showImg={false} />
      <Main>
        <Scroll>
          <CourseContent />
          <ButtonWrapper>
            <LargeOrangeButton
              label={t('course.create')}
              onBtnClick={() => window.location.replace('/user/course/AI')}
            />
          </ButtonWrapper>
        </Scroll>
      </Main>
      <CustomerBottomNav />
    </div>
  )
}

export default CoursePage
