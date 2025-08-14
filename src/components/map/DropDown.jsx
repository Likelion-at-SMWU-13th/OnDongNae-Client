import React, { useState } from 'react'
import styled from 'styled-components'
import iconArrow from '@/assets/icon-arrow-down.svg'

const Wrap = styled.div`
  margin-top: 13px;
  position: relative;
  width: 90%;
`

const Trigger = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px 20px;
  border-radius: 30px;
  border: 1px solid #f08e67;
  background: #fff;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.1);

  font-size: 16px;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
`

const Text = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  color: rgba(0, 0, 0, 0.4);

  &.selected {
    color: #000;
  }
`

const Icon = styled.img`
  width: 13px;
  height: 13px;
`

const ItemList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0;
  padding: 10px 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 11px;

  background: #fff;
  border-radius: 0 0 10px 10px;
  border: 1px solid #f08e67;
  border-top: none;
  z-index: 20;
`

const Item = styled.li`
  font-size: 14px;
  color: #222;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;

  &:hover,
  &.active {
    border-radius: 10px;
    background: #feb99d;
  }
`

// id 배열을 options로 받음
function DropDown({ value, onChange, placeholder, options = [] }) {
  const [open, setOpen] = useState(false)

  const handleSelect = (opt) => {
    onChange?.(opt) // { label, value } 그대로 돌려줌
    setOpen(false)
  }

  const isSelected = !!value //
  const displayLabel = value?.label || placeholder

  return (
    <Wrap>
      <Trigger type='button' onClick={() => setOpen(!open)}>
        <Text className={isSelected ? 'selected' : ''}>{displayLabel}</Text>
        <Icon src={iconArrow} alt='' />
      </Trigger>

      {open && (
        <ItemList>
          {options.map((opt) => {
            const isActive = value && String(value.value) === String(opt.value)
            return (
              <Item
                key={opt.value}
                className={isActive ? 'active' : ''}
                onClick={() => handleSelect(opt)}
              >
                {opt.label}
              </Item>
            )
          })}
        </ItemList>
      )}
    </Wrap>
  )
}

export default DropDown
