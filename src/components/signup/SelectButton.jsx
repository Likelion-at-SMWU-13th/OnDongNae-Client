import React from 'react'
import styled from 'styled-components'

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 27px;
`

// 개별 버튼 (선택 / 기본 스타일은 클래스명으로 구분)
const Button = styled.button`
  width: 80.51%;
  padding: 14px;
  border-radius: 10px;
  border: 2px solid #e4e4e4;
  background: #fff;
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  color: #000;

  /* 선택된 상태 */
  &.selected {
    border: 2px solid #fa6432;
    background: #feb99d;
  }
`

// multiple true면 복수 선택 가능
function SelectButton({ options = [], multiple = false, value, onChange }) {
  // id가 선택되었는지 판별 (모드에 따라 비교 방식이 다름)
  const isSelected = (id) => (multiple ? Array.isArray(value) && value.includes(id) : value === id)

  const handleClick = (id) => {
    // multiple false면 그냥 눌린 id로 치환
    if (!multiple) return onChange(id)

    // multiple true면 배열에 추가+삭제
    const current = Array.isArray(value) ? value : []
    onChange(current.includes(id) ? current.filter((v) => v !== id) : [...current, id])
  }

  return (
    <List>
      {options.map(({ id, name }) => {
        const selected = isSelected(id)
        return (
          <Button
            key={id}
            type='button'
            className={selected ? 'selected' : ''}
            onClick={() => handleClick(id)} // 클릭 시 선택/해제
          >
            {name}
          </Button>
        )
      })}
    </List>
  )
}

export default SelectButton
