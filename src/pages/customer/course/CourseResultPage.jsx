import styled from 'styled-components'
import Header from '@/components/common/Header'
import DoubleTitle from '@/components/common/DoubleTitle'
import backIcon from '@/assets/button-back.svg'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'

const CourseResultPage = () => {
  const { t } = useTranslation()
  const { state } = useLocation()
  const navigate = useNavigate()

  const handleShare = () => {
    navigate('/user/course/AI')
  }

  // 데이터 구조분해
  const { title = '', description = '', recommendedCourseStores = [] } = state ?? {}

  // 필수 데이터 없을 때
  if (!state) {
    return (
      <div>
        <Header img={backIcon} title={t('bottomNav.course')} showImg={false} />
        <Empty>{t('course.failComment')}</Empty>
        <CustomerBottomNav />
      </div>
    )
  }

  return (
    <div>
      <Header img={backIcon} title={t('bottomNav.course')} showImg={false} />
      <DoubleTitle title={title} subtitle={description} />

      <CourseWrapper>
        {recommendedCourseStores.map((store) => (
          <StoreWrapper key={store.order ?? store.name}>
            <StoreHeader>
              <StoreImg src={store.imageUrl} alt={store.name} />
              <StoreTextWrapper>
                <StoreName>{store.name}</StoreName>
                <StoreShortDescription>{store.shortDescription}</StoreShortDescription>
              </StoreTextWrapper>
            </StoreHeader>
            <StoreLongDescription>{store.longDescription}</StoreLongDescription>
          </StoreWrapper>
        ))}
      </CourseWrapper>
      <ButtonContainer>
        <RegenerateBtn onClick={() => navigate(-1)}>{t('course.regenerate')}</RegenerateBtn>
        <ShareBtn onClick={handleShare}>{t('course.share')}</ShareBtn>
      </ButtonContainer>
      <CustomerBottomNav />
    </div>
  )
}

export default CourseResultPage

/* ---------- styles ---------- */
const CourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; /* 카드 간격 */
  padding: 0 16px 24px;
`
const StoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
`
const StoreHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const StoreTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const StoreImg = styled.img`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  object-fit: cover;
`
const StoreName = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
`
const StoreShortDescription = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin: 0;
  max-width: 240px; /* 줄바꿈 컨트롤 */
  line-height: 1.4;
`
const StoreLongDescription = styled.p`
  margin: 8px 0 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.6;
`
const Empty = styled.p`
  padding: 24px 16px;
  color: #777;
  font-size: 14px;
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 77.43%;
  gap: 12.3%;
  margin: 0 auto;
  padding-top: 34px;
`
const RegenerateBtn = styled.button`
  width: 125px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #feb99d;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px; /* 131.25% */
`
const ShareBtn = styled.button`
  width: 125px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #f08e67;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px; /* 131.25% */
`
