import React from 'react'
import Header from '@/components/common/Header'
import BottomNav from '@/components/common/BottomNav'
import DoubleTitle from '@/components/common/DoubleTitle'
import backIcon from '@/assets/button-back.svg'
import styled from 'styled-components'

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 높이 */
`

const Content = styled.div`
  flex: 1; /* Header+DoubleTitle+BottomNav 제외하고 남은 영역 */
  overflow-y: auto; /* 세로 스크롤 */
  padding-bottom: 60px; /* BottomNav 높이만큼 여백 */
`

const HoursEditPage = () => {
  return (
    <PageWrap>
      <Content>
        <Header img={backIcon} title='영업 시간' showImg={true} />
        <DoubleTitle
          title='영업시간을 수정해주세요'
          subtitle={
            <>
              영업일이 모두 같다면,
              <br /> 시간을 고른 후 '모두 적용'을 눌러주세요.
            </>
          }
        />
      </Content>
      <BottomNav />
    </PageWrap>
  )
}

export default HoursEditPage
