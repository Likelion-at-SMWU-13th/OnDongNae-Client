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

function SelectButton({ options = [], value, onChange }) {
  // options 는 전체 옵션, value는 선택된 값
  return (
    <List>
      {options.map(
        // options 는 [{id, name}] 형태
        (opt) => (
          <Button
            key={opt.id} // 선택된 id 번호
            type='button'
            className={value === opt.id ? 'selected' : ''} // 선택 여부에 따라 클래스 부여
            onClick={() => onChange(opt.id)}
          >
            {opt.name}
          </Button>
        ),
      )}
    </List>
  )
}

export default SelectButton
