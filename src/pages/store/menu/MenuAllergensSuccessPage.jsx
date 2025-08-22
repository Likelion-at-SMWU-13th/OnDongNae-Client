import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import BottomNav from '@/components/common/BottomNav'
import AllergensEdit from '@/components/menuManagement/AllergensEdit'
import { useLocation, useNavigate } from 'react-router-dom'

const TitleWrapper = styled.div`
  white-space: pre-line;
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

const MenuAllergensSuccess = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  // 로딩 페이지에서 넘긴 데이터
  const initialResults = state?.initialResults ?? []
  return (
    <div className='scrollable'>
      <Header img={backIcon} title={'메뉴 관리'} showImg={true} />
      <Main>
        <Scroll>
          <TitleWrapper>
            <DoubleTitle
              title='알레르기 분석이 끝났어요'
              subtitle={
                '가능한 알레르기 성분을 적어놓았어요.\n수정 버튼을 누르면 내용을 바꿀 수 있어요.'
              }
            />
          </TitleWrapper>
          {/* ✅ 결과를 컴포넌트에 전달 */}
          <AllergensEdit
            initialResults={initialResults}
            onSaved={() => navigate('/menu/allergens/apply')}
          />
        </Scroll>
      </Main>
      <BottomNav />
    </div>
  )
}

export default MenuAllergensSuccess
