import React, { useMemo, useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import iconLocation from '@/assets/icon-location.svg'
import iconPhone from '@/assets/icon-phone-call.svg'
import defaultStoreImg from '@/assets/img-defaultStoreImg.svg'

// 전체 ScrollArea
const Sheet = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -8px 20px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden; // 리스트만 스크롤 가능하게
  z-index: 20;
`

/* 드래그 가능한 상단 헤더(손잡이 + 타이틀) */
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
  font-size: 23px;
  font-weight: 600;
`

/* 스크롤 리스트: 이 영역만 스크롤됨 */
const List = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1 1 auto; /* 시트 높이에서 남은 영역 전부 */
  min-height: 0; /* flex 컨테이너에서 스크롤 가능하도록 */
  margin-top: 12px;
  padding: 0 24px 16px 24px;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  -webkit-overflow-scrolling: touch;
`

const Card = styled.button`
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
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  margin: 0 0 2px 0;
`

const StoreInfo = styled.div`
  display: flex;
  gap: 15px;
  color: #000;
  font-feature-settings: 'dlig' on;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 6px;
`

const Info = styled.span``

const StoreImg = styled.img`
  width: 328px;
  height: 84px;
  margin: 6px 0 10px 0;
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #000;
  font-feature-settings: 'dlig' on;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
`

const Icon = styled.img`
  width: 21px;
  height: 21px;
`

const Empty = styled.div`
  padding: 28px 8px;
  color: #999;
  text-align: center;
  font-size: 14px;
`

// 카드사이 구분선
const CardDivider = styled.div`
  position: relative;
  padding-bottom: 9px;

  &:not(:last-child)::after {
    content: '';
    display: block;
    height: 9px;
    background: #e9e9ed;
    margin: 12px -24px 0 -24px; /* List padding(24px) 상쇄 → edge-to-edge 라인 */
  }
`

/* ----- 선택 상태로부터 활성 소분류 이름 배열 만들기 ----- */
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

const ScrollArea = ({
  title = 'Stores',
  stores = [],
  randomStores = [],
  categories = [],
  selectedMainId = null,
  selectedSubIds = [],
  onStoreClick,
}) => {
  /* 리스트 필터링*/
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

  /* 드래그로 높이 조절 */
  const [heightPct, setHeightPct] = useState(20) // 초기 30dvh
  const snapPoints = [20, 50, 72] // 스냅 단계
  const minPct = 24,
    maxPct = 92
  const dragRef = useRef({ startY: 0, startH: 30, dragging: false })

  const getVH = () => window.visualViewport?.height || window.innerHeight
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
  const nearest = (v, arr) =>
    arr.reduce((p, c) => (Math.abs(c - v) < Math.abs(p - v) ? c : p), arr[0])

  const onPointerDown = (e) => {
    const y = e.clientY ?? e.touches?.[0]?.clientY
    if (y == null) return
    dragRef.current = { startY: y, startH: heightPct, dragging: true }
    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
  }

  const onPointerMove = (e) => {
    if (!dragRef.current.dragging) return
    e.preventDefault() /* 헤더 드래그 중 문서 스크롤 방지 */
    const y = e.clientY ?? e.touches?.[0]?.clientY
    if (y == null) return
    const deltaPct = ((dragRef.current.startY - y) / getVH()) * 100
    setHeightPct(clamp(dragRef.current.startH + deltaPct, minPct, maxPct))
  }

  const onPointerUp = () => {
    if (!dragRef.current.dragging) return
    dragRef.current.dragging = false
    setHeightPct((v) => clamp(nearest(v, snapPoints), minPct, maxPct))
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }

  // 주소창 변화 등 뷰포트 변경 시 현재 비율 유지
  useEffect(() => {
    const onResize = () => setHeightPct((v) => clamp(v, minPct, maxPct))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <Sheet style={{ height: `${heightPct}dvh` }}>
      <DragHeader onPointerDown={onPointerDown}>
        <Handle />
        <Title>{title}</Title>
      </DragHeader>

      <List>
        {list.length === 0 && <Empty>조건에 맞는 가게가 없어요.</Empty>}

        {list.map((s) => (
          <CardDivider key={s.id}>
            <Card onClick={() => onStoreClick?.(s.id)} type='button'>
              <StoreName>{s.name}</StoreName>

              <StoreInfo>
                {s.isOpen ? <Info>Open</Info> : <Info>Closed</Info>}
                <Info>{Array.isArray(s.subCategories) ? s.subCategories.join(', ') : ''}</Info>
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
                  <span>{s.phone}</span>
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
