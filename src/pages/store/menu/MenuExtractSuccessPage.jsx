import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import BottomNav from '@/components/common/BottomNav'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import MenuEdit from '@/components/menuManagement/MenuEdit'

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 92px;
`

export default function MenuExtractSuccessPage() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const initialItems = state?.initialItems // 로딩 페이지에서 넘겨줌: [{ nameKo, priceKrw }, ...]

  // 새로고침 등으로 state가 비었을 때 대비
  useEffect(() => {
    if (!Array.isArray(initialItems) || initialItems.length === 0) {
      navigate('/menu/extract/fail', { replace: true })
    }
  }, [initialItems, navigate])

  if (!Array.isArray(initialItems) || initialItems.length === 0) {
    return null
  }

  return (
    <>
      <div className='scrollable'>
        <Header img={backIcon} title='메뉴 관리' showImg />
        <Main>
          <Scroll>
            <DoubleTitle
              title='메뉴 추출이 끝났어요'
              subtitle='수정 버튼을 누르면 내용을 바꿀 수 있어요.'
            />

            {/* ✅ 반드시 props로 전달 */}
            <MenuEdit initialItems={initialItems} />
          </Scroll>
        </Main>
        <BottomNav />
      </div>
    </>
  )
}

export const Main = styled.main`
  height: calc(100dvh - 160px); /* 화면 높이 채우기 */
  display: flex;
  flex-direction: column;
  min-height: 0;
`

export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간을 차지 */
  min-height: 0; /* 내부에 overflow가 먹히게 하는 핵심 */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 80px);
`
