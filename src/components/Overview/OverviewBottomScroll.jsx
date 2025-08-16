import React, { useMemo, useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import cardImage from '@/assets/image.png'

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

const getVH = () => window.visualViewport?.height || window.innerHeight
const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
const nearest = (v, arr) =>
  arr.reduce((p, c) => (Math.abs(c - v) < Math.abs(p - v) ? c : p), arr[0])

const MARKETS = [
  { id: 1, nameKey: 'overview.YongmunMarket', descKey: 'overview.yongmunDescription' },
  { id: 3, nameKey: 'overview.huamMarket', descKey: 'overview.huamDescription' },
  { id: 2, nameKey: 'overview.itaewonMarket', descKey: 'overview.itaewonDescription' },
  { id: 4, nameKey: 'overview.manlyMarket', descKey: 'overview.manlyDescription' },
  { id: 5, nameKey: 'overview.haebangchonMarket', descKey: 'overview.haebangchonDescription' },
]

const ScrollArea = ({
  stores = [],
  randomStores = [],
  categories = [],
  selectedMainId = null,
  selectedSubIds = [],
  onStoreClick,
  initialHeightPct = 20,
  snapPoints = [4, 20, 65],
  bottomOffset = 0,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

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

  const snaps = useMemo(() => {
    const arr = (snapPoints && snapPoints.length ? snapPoints : [20, 65])
      .slice()
      .sort((a, b) => a - b)
    return arr
  }, [snapPoints])

  const minSnap = snaps[0]
  const maxSnap = snaps[snaps.length - 1]
  const [heightPct, setHeightPct] = useState(() => clamp(initialHeightPct, minSnap, maxSnap))
  const dragRef = useRef({ startY: 0, startH: heightPct, dragging: false })

  const onPointerDown = (e) => {
    const y = e.clientY ?? e.touches?.[0]?.clientY
    if (y == null) return
    dragRef.current = { startY: y, startH: heightPct, dragging: true }
    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
  }

  const onPointerMove = (e) => {
    if (!dragRef.current.dragging) return
    e.preventDefault()
    const y = e.clientY ?? e.touches?.[0]?.clientY
    if (y == null) return
    const deltaPct = ((dragRef.current.startY - y) / getVH()) * 100
    setHeightPct(clamp(dragRef.current.startH + deltaPct, minSnap, maxSnap))
  }

  const onPointerUp = () => {
    if (!dragRef.current.dragging) return
    dragRef.current.dragging = false
    setHeightPct((v) => clamp(nearest(v, snaps), minSnap, maxSnap))
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }

  useEffect(() => {
    const onResize = () => setHeightPct((v) => clamp(v, minSnap, maxSnap))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [minSnap, maxSnap])

  const handleCardClick = (m) => {
    navigate(`/user/overview/info/${m.id}`) // 필요 시 id 기반 경로로 변경
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
        <Title>{t('overview.title')}</Title>{' '}
      </DragHeader>

      {/* 리스트 스크롤 영역은 그대로 */}
      <List>
        {/* 카드 데이터 소스는 MARKETS로 전환 */}
        {MARKETS.length === 0 && <Empty>{t('text.notice')}</Empty>}

        {MARKETS.map((m) => (
          <CardDivider key={m.id}>
            <Card type='button' onClick={() => handleCardClick(m)}>
              <Row>
                <StoreImg src={cardImage} alt='' loading='lazy' />
                <TextBox>
                  <StoreName>{t(m.nameKey)}</StoreName>
                  <StoreDesc>{t(m.descKey)}</StoreDesc>
                </TextBox>
              </Row>
            </Card>
          </CardDivider>
        ))}
      </List>
    </Sheet>
  )
}

export default ScrollArea

/* ===== 스타일 ===== */
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
  overflow: hidden;
  z-index: 20;
`

const DragHeader = styled.div`
  padding: 15px 30px 0 30px;
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
  color: #1a0f0f;
  font-feature-settings: 'dlig' on;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 155.556% */
  margin-top: 20px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 11px;
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
  margin-top: 9px;
  width: 100%;
  background: #fff;
  border: none;
  text-align: left;
  cursor: pointer;
  padding: 0;
`

/* 행 레이아웃: 이미지 왼쪽, 텍스트 오른쪽 */
const Row = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`

/* 이미지: 100x66, shrink 금지 */
const StoreImg = styled.img`
  width: 100px;
  height: 66px;
  flex-shrink: 0;
  object-fit: cover;
`

/* 텍스트 영역 */
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`

/* 이름(nameKey) 스타일 */
const StoreName = styled.p`
  color: #1a0f0f;
  font-feature-settings: 'dlig' on;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 150% */
  margin: 0;

  /* 한 줄 말줄임 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

/* 설명(description) 스타일 */
const StoreDesc = styled.p`
  width: 235px;
  color: #1a0f0f;
  font-feature-settings: 'dlig' on;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 21px; /* 150% */
  margin: 0;
`

const Empty = styled.div`
  padding: 28px 8px;
  color: #999;
  text-align: center;
  font-size: 14px;
`

const CardDivider = styled.div`
  position: relative;
  margin-bottom: 27px;
`
