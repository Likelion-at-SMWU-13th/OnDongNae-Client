import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as C from '@/styles/common/CustomerBottomNav.styles'
import Header from '@/components/common/Header'
import DoubleTitle from '@/components/common/DoubleTitle'
import AllergensEdit from '@/components/menuManagement/AllergensEdit'
import BottomNav from '@/components/common/BottomNav'

const MenuAllergensSuccess = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  // 로딩 페이지에서 넘긴 데이터
  const initialResults = state?.initialResults ?? []
  return (
    <div className='scrollable'>
      <Header title={'메뉴 관리'} showImg={true} />
      <C.Main>
        <C.Scroll>
          <TitleWrapper>
            <DoubleTitle
              title='알레르기 분석이 끝났어요'
              subtitle={
                '가능한 알레르기 성분을 적어놓았어요.\n수정 버튼을 누르면 내용을 바꿀 수 있어요.'
              }
            />
          </TitleWrapper>
          <AllergensEdit
            initialResults={initialResults}
            onSaved={() => navigate('/menu/allergens/apply')}
          />
        </C.Scroll>
      </C.Main>
      <BottomNav />
    </div>
  )
}

export default MenuAllergensSuccess

const TitleWrapper = styled.div`
  white-space: pre-line;
`
