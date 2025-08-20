// src/pages/course/CourseDetailPage.jsx
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import DoubleTitle from '@/components/common/DoubleTitle'
import backIcon from '@/assets/button-back.svg'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'

export default function CourseDetailPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams() // /courses/:id
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  //  배포 도메인이 있으면 우선 사용, 없으면 현재 origin
  const origin = import.meta.env.VITE_API_URL ?? window.location.origin
  const shareUrl = `${origin}/courses/${id}`

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`/stores/${id}`, { method: 'GET' })
        if (!res.ok) throw new Error('Failed to fetch')
        const json = await res.json()
        if (mounted) {
          // 응답 형태: { code, message, success, data: {...(id 없음)} }
          setData(json?.data ?? null)
        }
      } catch (e) {
        console.error(e)
        if (mounted) setData(null)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => (mounted = false)
  }, [id])

  const stores = useMemo(() => {
    const arr = data?.recommendedCourseStores
    if (!Array.isArray(arr)) return []
    return [...arr].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }, [data])

  const handleShare = async () => {
    if (!id) {
      alert(t('course.shareUnavailable') || '공유할 코스 정보를 찾을 수 없습니다.')
      return
    }
    const shareData = {
      title: data?.title || '코스 공유',
      text: data?.description || '함께 가볼까요?',
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

  if (loading) {
    return (
      <div>
        <Header img={backIcon} title={t('bottomNav.course')} showImg={false} />
        <Empty>{t('common.loading') || '불러오는 중...'}</Empty>
        <CustomerBottomNav />
      </div>
    )
  }

  if (!data) {
    return (
      <div>
        <Header img={backIcon} title={t('bottomNav.course')} showImg={false} />
        <Empty>{t('course.failComment') || '코스 정보를 불러오지 못했어요.'}</Empty>
        <CustomerBottomNav />
      </div>
    )
  }

  const { title = '', description = '' } = data

  return (
    <div>
      <Header img={backIcon} title={t('bottomNav.course')} showImg={false} />
      <DoubleTitle title={title} subtitle={description} />

      <CourseWrapper>
        {stores.map((store, idx) => (
          <Row key={store.order ?? `${store.name}-${idx}`}>
            {/* 왼쪽 타임라인(주황선 + 번호) */}
            <TimelineCell $isFirst={idx === 0} $isLast={idx === stores.length - 1}>
              <Dot>{store.order}</Dot>
            </TimelineCell>

            {/* 오른쪽 카드 */}
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

/* ---------- styles (ResultPage와 동일) ---------- */
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

// JS(.jsx)이므로 제네릭 X, transient props로 그대로 사용
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

  /* 위쪽 선 (첫 행이면 숨김) */
  &::before {
    top: 0;
    bottom: calc(50% + 16px);
    display: ${(props) => (props.$isFirst ? 'none' : 'block')};
  }

  /* 아래쪽 선 (마지막 행이면 숨김) */
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
