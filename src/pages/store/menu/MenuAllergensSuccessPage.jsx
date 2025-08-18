import React from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import BottomNav from '@/components/common/BottomNav'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'
import AllergensEdit from '@/components/menuManagement/AllergensEdit'
import { useNavigate } from 'react-router-dom'
const ALLERGENS_MOCK = {
  // response body
  code: 'OK',
  message: '알레르기 추출 성공',
  success: true,
  data: {
    results: [
      {
        menuId: 1,
        nameKo: '떡볶이&모둠튀김&어묵 세트',
        allergiesCanonical: ['Wheat', 'Fish'],
      },
      {
        menuId: 2,
        nameKo: '땅콩소스 비빔국수',
        allergiesCanonical: ['Wheat', 'Soy', 'Peanuts'],
      },
      {
        menuId: 3,
        nameKo: '돈가스 카레우동',
        allergiesCanonical: ['Pork', 'Wheat', 'Eggs'],
      },
      {
        menuId: 4,
        nameKo: '김치전골(돼지고기)',
        allergiesCanonical: ['Pork', 'Wheat'],
      },
    ],
  },
}

const ALLERGES_SAVE_MOCK = {
  menuAllergies: {
    //object<menuId, string[]>
    1: ['Soy', 'Wheat'],
    2: ['Shrimp', 'Wheat'],
    3: ['Wheat', 'Eggs'],
  },
}
const handleSave = () => {}
const ButtonWapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`
const TitleWrapper = styled.div`
  white-space: pre-line;
`
const MenuAllergensSuccess = () => {
  const navigate = useNavigate()
  const handleSubmit = () => {
    navigate('/menu/allergens/apply')
  }
  return (
    <div className='scrollable'>
      <Header img={backIcon} title={'메뉴 관리'} showImg={true} />
      <Main>
        <Scroll>
          <TitleWrapper>
            <DoubleTitle
              title='알레르기 분석이 끝났어요'
              subtitle='가능한 알레르기 성분을 적어놓았어요.
수정 버튼을 누르면 내용을 바꿀 수 있어요.'
            />
          </TitleWrapper>
          <AllergensEdit />
          <ButtonWapper>
            <SmallButtonContainer handleSubmit={handleSubmit} />
          </ButtonWapper>
        </Scroll>
      </Main>
      <BottomNav />
    </div>
  )
}

export default MenuAllergensSuccess

export const Main = styled.main`
  height: calc(100dvh - 155px); /* 화면 높이 채우기 */
  display: flex;
  flex-direction: column;
  min-height: 0;
`

export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간을 차지 */
  min-height: 0; /* 내부에 overflow가 먹히게 하는 핵심 */
  /* overflow-y는 전역 .scrollable에서 적용됨 */
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 80px);
`
