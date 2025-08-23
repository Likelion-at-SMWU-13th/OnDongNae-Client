import React from 'react'
import styled from 'styled-components'

function LanguageButton({ options = [], value, onChange }) {
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

export default LanguageButton

const List = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 3.4dvh;
`

// 개별 언어 버튼
const Button = styled.button`
  padding: 1.6dvh 0;
  border-radius: 10px;
  border: 2px solid #e4e4e4;
  background: #fff;
  text-align: center;
  font-size: 25px;
  font-weight: 400;
  color: #000;
  cursor: pointer;

  /* 선택된 상태 */
  &.selected {
    color: #fff;
    border: 2px solid #f08e67;
    background: #f08e67;
  }
`
