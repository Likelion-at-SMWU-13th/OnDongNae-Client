import React from 'react'
import styled from 'styled-components'

function TabSection({ active, onChange }) {
  return (
    <TabBar>
      <TabBtn type='button' data-selected={active === 'menu'} onClick={() => onChange('menu')}>
        Menu
      </TabBtn>
      <TabBtn type='button' data-selected={active === 'info'} onClick={() => onChange('info')}>
        Info
      </TabBtn>
    </TabBar>
  )
}

const TabBar = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 26px;
  padding: 0 25px;
  border-bottom: 1px solid #eaeaea; /* 아래 회색 라인 */
`

const TabBtn = styled.button`
  position: relative;
  border: none;
  background: transparent;
  padding: 8px 0;
  cursor: pointer;
  color: #000;
  font-size: 14px;
  font-weight: 700;

  /* 주황색 바 */
  &[data-selected='true']::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px; /* 회색 라인과 겹치도록 살짝 내림 */
    transform: translateX(-50%);
    width: 44px;
    height: 6px;
    background: #f08e67;
    border-radius: 4px;
  }
`

export default TabSection
