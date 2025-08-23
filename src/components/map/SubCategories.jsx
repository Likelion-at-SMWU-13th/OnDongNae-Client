import React from 'react'
import styled from 'styled-components'

const SubCategories = ({ subCategories = [], selectedSubIds = [], onToggleSub }) => {
  if (!subCategories?.length) return null

  return (
    <CategoryList>
      {subCategories.map((sub) => {
        const active = selectedSubIds?.some((id) => String(id) === String(sub.id))
        return (
          <CategoryItem
            key={sub.id}
            className={`clickable ${active ? 'filled' : ''}`}
            onClick={() => onToggleSub?.(sub.id)}
            type='button'
          >
            {sub.name}
          </CategoryItem>
        )
      })}
    </CategoryList>
  )
}

export default SubCategories

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
  font-size: 14px;
  font-weight: 400;

  &.filled {
    color: #fff;
    background: #fb9f7a;
  }
  &.clickable {
    cursor: pointer;
  }
`
