// src/pages/course/CourseDetailPage.jsx
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import * as C from '@/styles/common/CustomerBottomNav.styles'
import Header from '@/components/common/Header'
import DoubleTitle from '@/components/common/DoubleTitle'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'

export default function CourseDetailPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { courseId } = useParams() // /courses/:courseId
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  //  배포 도메인이 있으면 우선 사용, 없으면 현재 origin
  const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
  const PUBLIC_ORIGIN = import.meta.env.VITE_PUBLIC_SITE_URL ?? window.location.origin
  const shareUrl = `${PUBLIC_ORIGIN}/courses/${courseId}`
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const token =
          sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''
        const res = await fetch(`${API_URL}/courses/${encodeURIComponent(courseId)}`, {
          method: 'GET',
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            // 서버가 언어 헤더 기대하면 추가
            'Accept-Language': (navigator.language || 'en').split('-')[0],
          },
        })

        if (!res.ok) {
          // ← 여기가 핵심: 서버가 보내준 에러 본문을 읽어 콘솔에 출력
          const text = await res.text()
          console.error('Course detail error', res.status, res.statusText, text)
          throw new Error(`Failed to fetch: ${res.status}`)
        }

        const json = await res.json()
        if (mounted) setData(json?.data ?? null)
      } catch (err) {
        console.log(err)
        if (mounted) setData(null)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => (mounted = false)
  }, [courseId, API_URL])
  const stores = useMemo(() => {
    const arr = data?.recommendedCourseStores
    if (!Array.isArray(arr)) return []
    return [...arr].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }, [data])

  const handleShare = async () => {
    if (!courseId) {
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
        <Header title={t('bottomNav.course')} showImg={false} />
        <Empty>{t('common.loading') || '불러오는 중...'}</Empty>
        <CustomerBottomNav />
      </div>
    )
  }

  if (!data) {
    return (
      <div>
        <Header title={t('bottomNav.course')} showImg={false} />
        <Empty>{t('course.failComment') || '코스 정보를 불러오지 못했어요.'}</Empty>
        <CustomerBottomNav />
      </div>
    )
  }

  const { title = '', description = '' } = data

  return (
    <div className='scrollable'>
      <Header title={t('bottomNav.course')} showImg={false} />
      <C.Main>
        <C.Scroll>
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
        </C.Scroll>
      </C.Main>
      <CustomerBottomNav />
    </div>
  )
}

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
