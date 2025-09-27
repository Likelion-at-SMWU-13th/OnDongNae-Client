// CourseResultPage.jsx
import styled from 'styled-components'
import Header from '@/components/common/Header'
import DoubleTitle from '@/components/common/DoubleTitle'
import * as C from '@/styles/common/CustomerBottomNav.styles'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'

const CourseResultPage = () => {
  const { t } = useTranslation()
  const { state } = useLocation()
  const navigate = useNavigate()

  // state 구조분해
  const { id = '', title = '', description = '', recommendedCourseStores = [] } = state ?? {}
  const shareUrl = `https://gorugoru.vercel.app/user/course/detail/${id}`
  const handleShare = async () => {
    if (!id) {
      alert(t('course.shareUnavailable') || '공유할 코스 정보를 찾을 수 없습니다.')
      return
    }

    const shareData = {
      title: title || '코스 공유',
      text: description || '함께 가볼까요?',
      url: shareUrl,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (e) {
        console.error('공유 실패:', e)
      }
    } else if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl)
        alert(t('course.linkCopied') || '공유 링크가 복사되었습니다.')
      } catch (e) {
        console.error('URL 복사 실패: ', e)
      }
    } else {
      prompt(t('course.copyManually') || '이 링크를 복사하세요:', shareUrl)
    }
  }

  // 데이터 없을 때
  if (!state) {
    return (
      <div>
        <Header title={t('bottomNav.course')} showImg={true} />
        <Empty>{t('course.failComment')}</Empty>
        <CustomerBottomNav />
      </div>
    )
  }

  const handleStoreMove = (storeId) => {
    if (!storeId) return // 안전 장치
    navigate(`/user/map/store/${storeId}`)
  }
  const stores = Array.isArray(recommendedCourseStores)
    ? [...recommendedCourseStores].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : []

  return (
    <>
      <Header title={t('bottomNav.course')} showImg={false} />
      <C.Main className='scrollable'>
        <C.Scroll>
          <TitleWrapper>
            <DoubleTitle title={title} subtitle={description} />
          </TitleWrapper>
          <CourseWrapper>
            {stores.map((store, idx) => (
              <Row
                key={store.order ?? `${store.name}-${idx}`}
                onClick={() => handleStoreMove(store.id)}
              >
                <TimelineCell $isFirst={idx === 0} $isLast={idx === stores.length - 1}>
                  <Dot>{store.order}</Dot>
                </TimelineCell>
                <StoreWrapper>
                  <StoreHeader>
                    <StoreImg src={store.imageUrl} alt={store.name} />
                    <StoreTextWrapper>
                      <StoreName>{store.name}</StoreName>
                      <StoreShortDescription>{store.shortDescription}</StoreShortDescription>
                    </StoreTextWrapper>
                  </StoreHeader>
                  <StoreLongDescription>{store.longDescription}</StoreLongDescription>
                </StoreWrapper>
              </Row>
            ))}
          </CourseWrapper>

          <ButtonContainer>
            <RegenerateBtn type='button' onClick={() => navigate(-1)}>
              {t('course.regenerate')}
            </RegenerateBtn>
            <ShareBtn type='button' onClick={handleShare}>
              {t('course.share')}
            </ShareBtn>
          </ButtonContainer>
        </C.Scroll>
      </C.Main>
      <CustomerBottomNav />
    </>
  )
}

export default CourseResultPage

/* ---------- styles ---------- */
const TitleWrapper = styled.div`
  padding-right: 22px;
  padding-bottom: 30px;
`
const CourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
`
const Row = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr;
  column-gap: 12px;
  align-items: stretch;
  &:last-child {
    padding-bottom: 0;
  }
`
const TimelineCell = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-self: stretch;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    background: #f08e67;
    top: ${({ $isFirst }) => ($isFirst ? '14px' : '0')};
    bottom: ${({ $isLast }) => ($isLast ? 'calc(100% - 14px)' : '0')};
    z-index: 0;
  }
`
const Dot = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #f08e67;
  color: #f08e67;
  font-size: 12px;
  font-weight: 700;
  background: #fff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`
const StoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
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
  line-height: 1.4;
`
const StoreLongDescription = styled.p`
  margin: 8px 5px 0 0;
  font-size: 14px;
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
  justify-content: space-between;
  width: 77.43%;
  gap: 12.3%;
  margin: 0 auto;
  padding-top: 34px;
  padding-bottom: 39px;
`
const RegenerateBtn = styled.button`
  width: 125px;
  height: 43px;
  border-radius: 20px;
  background: #feb99d;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border: none;
`
const ShareBtn = styled.button`
  width: 125px;
  height: 43px;
  border-radius: 20px;
  background: #f08e67;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border: none;
`
