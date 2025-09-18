import React, { useMemo, useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import iconLocation from '@/assets/icon-location.svg'
import iconPhone from '@/assets/icon-phone-call.svg'
import defaultStoreImg from '@/assets/img-defaultStoreImg.png'

// 카테고리 배열 만들기
function activeSubcategoryNames(categories, selectedMainId, selectedSubIds) {
  if (!selectedMainId) return []
  const main = categories.find((c) => String(c.mainCategoryId) === String(selectedMainId))
  if (!main) return []
  if (Array.isArray(selectedSubIds) && selectedSubIds.length > 0) {
    const set = new Set(selectedSubIds.map(String))
    return (main.subCategories || [])
      .filter((s) => set.has(String(s.id)))
      .map((s) => String(s.name).trim())
  }
  return (main.subCategories || []).map((s) => String(s.name).trim())
}

// 스크롤 영역 계산
const getVH = () => window.visualViewport?.height || window.innerHeight
const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
const nearest = (v, arr) =>
  arr.reduce((p, c) => (Math.abs(c - v) < Math.abs(p - v) ? c : p), arr[0])

const ScrollArea = ({
  title = 'Stores',
  stores = [],
  randomStores = [],
  categories = [],
  selectedMainId = null,
  selectedSubIds = [],
  onStoreClick,
  // 스크롤 영역 높이
  initialHeightPct = 20, // 초기 높이
  snapPoints = [7, 20, 70], // 스냅 포인트
  bottomOffset = 0, // 하단 오프셋
  isLoading = false,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // 리스트 필터링
  const isAnythingSelected =
    !!selectedMainId || (Array.isArray(selectedSubIds) && selectedSubIds.length > 0)

  const list = useMemo(() => {
    if (!isAnythingSelected) return randomStores || []
    const activeNames = activeSubcategoryNames(categories, selectedMainId, selectedSubIds)
    if (activeNames.length === 0) return []
    const set = new Set(activeNames.map((n) => String(n).trim()))
    return (stores || []).filter(
      (s) =>
        Array.isArray(s.subCategories) && s.subCategories.some((n) => set.has(String(n).trim())),
    )
  }, [isAnythingSelected, randomStores, stores, categories, selectedMainId, selectedSubIds])

  // ScrollArea 계산
  const snaps = useMemo(() => {
    const arr = (snapPoints && snapPoints.length ? snapPoints : [20, 65])
      .slice()
      .sort((a, b) => a - b)
    return arr
  }, [snapPoints])

  // 가장 낮은 지점과 가장 높은 지점 지정
  const minSnap = snaps[0]
  const maxSnap = snaps[snaps.length - 1]

  const [heightPct, setHeightPct] = useState(() => clamp(initialHeightPct, minSnap, maxSnap))

  // 드래그 시작
  const dragRef = useRef({ startY: 0, startH: heightPct, dragging: false })
  const onPointerDown = (e) => {
    const y = e.clientY ?? e.touches?.[0]?.clientY
    if (y == null) return
    dragRef.current = { startY: y, startH: heightPct, dragging: true }
    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
  }

  // 드래그 중
  const onPointerMove = (e) => {
    if (!dragRef.current.dragging) return
    e.preventDefault()
    const y = e.clientY ?? e.touches?.[0]?.clientY
    if (y == null) return
    const deltaPct = ((dragRef.current.startY - y) / getVH()) * 100
    setHeightPct(clamp(dragRef.current.startH + deltaPct, minSnap, maxSnap))
  }

  // 드래그 종료
  const onPointerUp = () => {
    if (!dragRef.current.dragging) return
    dragRef.current.dragging = false
    setHeightPct((v) => nearest(v, snaps))
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }

  // 창 크기 바뀔 때 높이가 벗어나지 않게 조정
  useEffect(() => {
    const onResize = () => setHeightPct((v) => clamp(v, minSnap, maxSnap))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [minSnap, maxSnap])

  // 가게 카드 클릭 시 페이지 이동
  const handleCardClick = (id) => {
    const storeId = String(id)
    navigate(`/user/map/store/${storeId}`) // 가게 id에 맞게 경로 변경 필요
  }

  return (
    <Sheet
      style={{
        height: `${heightPct}dvh`,
        bottom: bottomOffset ? `${bottomOffset}px` : 0,
      }}
    >
      <DragHeader onPointerDown={onPointerDown}>
        <Handle />
        <Title>{title}</Title>
      </DragHeader>

      {/* 리스트만 스크롤 */}
      <List>
        {!isLoading && list.length === 0 && <Empty>{t('text.notice')}</Empty>}

        {!isLoading &&
          list.map((s) => (
            <CardDivider key={s.id}>
              {/* 카드 클릭 시 해당 가게로 이동 */}
              <Card onClick={() => handleCardClick(s.id)} type='button'>
                <StoreName>{s.name}</StoreName>

                <StoreInfo>
                  <Info>{Array.isArray(s.subCategories) ? s.subCategories.join(', ') : ''}</Info>
                  <Info>|</Info>
                  {s.isOpen ? (
                    <OpenInfo>{t('text.open')}</OpenInfo>
                  ) : (
                    <OpenInfo>{t('text.closed')}</OpenInfo>
                  )}
                </StoreInfo>

                <StoreImg
                  src={s.image}
                  alt={s.name}
                  loading='lazy'
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = defaultStoreImg
                  }}
                />

                {s.address && (
                  <InfoRow>
                    <Icon src={iconLocation} alt='' />
                    <span>{s.address}</span>
                  </InfoRow>
                )}

                {s.phone && (
                  <InfoRow>
                    <Icon src={iconPhone} alt='' />
                    <span>{s.phone ? s.phone : t('text.noInfo')}</span>
                  </InfoRow>
                )}
              </Card>
            </CardDivider>
          ))}
      </List>
    </Sheet>
  )
}

export default ScrollArea

const Sheet = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  background: #fff;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -8px 20px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden; // f리스트만 스크롤 되게
  z-index: 20;
`

// 드래그 가능 영역
const DragHeader = styled.div`
  padding: 15px 24px 0 24px;
  cursor: grab;
  touch-action: none;
`

const Handle = styled.div`
  width: 80px;
  height: 5px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.4);
  margin: 0 auto 8px auto;
`

const Title = styled.p`
  margin: 12px 0 0;
  color: #323232;
  font-size: 1.4375rem;
  font-weight: 600;
`

// 스크롤 가능 영역
const List = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1 1 auto;
  min-height: 0;
  padding: 0 24px 16px 24px;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  -webkit-overflow-scrolling: touch;
`

/* 카드 */
const Card = styled.button`
  margin-top: 12px;
  width: 100%;
  height: 212px;
  text-align: left;
  background: #fff;
  border: none;
  cursor: pointer;
`

const StoreName = styled.p`
  color: #1a0f0f;
  font-feature-settings: 'dlig' on;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 28px;
  margin: 0 0 2px 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StoreInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #838383;
  font-size: 0.875rem;
  font-weight: 400;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Info = styled.span``

const OpenInfo = styled.span`
  color: #feb99d;
`

const StoreImg = styled.img`
  width: 328px;
  height: 87px;
  margin: 6px 0 10px 0;
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #000;
  font-feature-settings: 'dlig' on;
  font-size: 0.875rem;
  font-weight: 400;
  margin-bottom: 10px;

  min-width: 0;

  /* 아이콘 옆 텍스트만 말줄임 */
  span {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Icon = styled.img`
  width: 21px;
  height: 21px;
`

const Empty = styled.div`
  padding: 28px 8px;
  color: #999;
  text-align: center;
  font-size: 0.875rem;
`

// 카드 사이 구분선
const CardDivider = styled.div`
  position: relative;

  &:not(:last-child)::after {
    content: '';
    display: block;
    height: 6px;
    background: #e9e9ed;
    margin: 12px -24px 0 -24px;
  }
`
