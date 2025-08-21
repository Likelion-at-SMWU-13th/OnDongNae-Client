// CourseResultPage.jsx  ← JS/JSX 파일이면 이렇게 유지
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

  // state 구조분해
  const { id = '', title = '', description = '', recommendedCourseStores = [] } = state ?? {}

  //    공유 링크 도메인: 배포 도메인이 있으면 그걸, 없으면 현재 origin
  //    API 서버 도메인(VITE_API_URL) 말고, 공개 사이트 도메인(VITE_PUBLIC_SITE_URL) 쓰는 걸 권장
  const origin = import.meta.env.VITE_API_URL ?? window.location.origin
  const shareUrl = `${origin}/courses/${id}`

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

  // 배열 가드 + order 정렬
  const stores = Array.isArray(recommendedCourseStores)
    ? [...recommendedCourseStores].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : []

  return (
    <div>
      <Header img={backIcon} title={t('bottomNav.course')} showImg={false} />
      <DoubleTitle title={title} subtitle={description} />

      <CourseWrapper>
        {stores.map((store, idx) => (
          <Row key={store.order ?? `${store.name}-${idx}`}>
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

      <CustomerBottomNav />
    </div>
  )
}

export default CourseResultPage

/* ---------- styles ---------- */
const CourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px 24px;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr;
  column-gap: 12px;
  align-items: flex-start;
`

const TimelineCell = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: #f08e67;
  }

  &::before {
    top: 0;
    bottom: calc(50% + 16px);
    display: ${(props) => (props.$isFirst ? 'none' : 'block')};
  }

  &::after {
    top: calc(50% + 16px);
    bottom: 0;
    display: ${(props) => (props.$isLast ? 'none' : 'block')};
  }
`

const Dot = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  border: 2px solid #f08e67;
  color: #f08e67;
  font-size: 12px;
  font-weight: 700;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
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
  max-width: 240px;
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
  justify-content: space-between;
  width: 77.43%;
  gap: 12.3%;
  margin: 0 auto;
  padding-top: 34px;
`

const RegenerateBtn = styled.button`
  width: 125px;
  height: 43px;
  border-radius: 20px;
  background: #feb99d;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`

const ShareBtn = styled.button`
  width: 125px;
  height: 43px;
  border-radius: 20px;
  background: #f08e67;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`
