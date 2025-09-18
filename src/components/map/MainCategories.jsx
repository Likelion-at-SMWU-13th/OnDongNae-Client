import React from 'react'
import styled from 'styled-components'

const MainCategories = ({ market, categories = [], selectedMainId, onSelectMain }) => {
  if (!market) return null

  return (
    <CategoryList>
      {/* 대분류 칩들 */}
      {categories.map((cat) => {
        const active = String(selectedMainId) === String(cat.mainCategoryId)
        return (
          <CategoryItem
            key={cat.mainCategoryId}
            className={`clickable ${active ? 'filled' : ''}`}
            onClick={() => onSelectMain?.(cat.mainCategoryId)}
            type='button'
          >
            {cat.mainCategoryName}
          </CategoryItem>
        )
      })}
    </CategoryList>
  )
}

export default MainCategories

const CategoryList = styled.div`
  width: 90%;
  display: flex;
  gap: 10px;
  margin-top: 5px;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const CategoryItem = styled.button`
  height: 35px;
  flex-shrink: 0;
  padding: 9px 12px;
  border-radius: 30px;
  border: none;
  background: #fff;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.1);
  color: #000;
  font-size: 0.875rem;
  font-weight: 400;

  &.filled {
    color: #fff;
    background: #f08e67;
  }
  &.clickable {
    cursor: pointer;
  }
`
