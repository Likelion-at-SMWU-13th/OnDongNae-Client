// components/map/MajorCategoryChips.jsx
import React from 'react'
import styled from 'styled-components'

/* ===============================
   칩 레이아웃 / 스타일 (MainMapPage와 동일)
   =============================== */
const PillsRow = styled.div`
  width: 90%;
  display: flex;
  gap: 10px;
  margin-top: 13px;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Pill = styled.button`
  height: 35px;
  flex-shrink: 0;
  padding: 9px 12px;
  border-radius: 30px;
  border: none;
  background: #fff;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.1);
  color: #000;
  font-feature-settings: 'dlig' on;
  font-size: 14px;
  font-weight: 400;

  &.filled {
    color: #fff;

    border-radius: 30px;
    background: #f08e67;
    box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.1);
  }
  &.clickable {
    cursor: pointer;
  }
`

const MainCategories = ({ market, categories = [], selectedMainId, onSelectMain }) => {
  if (!market) return null

  return (
    <PillsRow>
      {/* 대분류 칩들 */}
      {categories.map((cat) => {
        const active = String(selectedMainId) === String(cat.mainCategoryId)
        return (
          <Pill
            key={cat.mainCategoryId}
            className={`clickable ${active ? 'filled' : ''}`}
            onClick={() => onSelectMain?.(cat.mainCategoryId)}
            type='button'
          >
            {cat.mainCategoryName}
          </Pill>
        )
      })}
    </PillsRow>
  )
}

export default MainCategories
