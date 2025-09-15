import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

function TabSection({ active, onChange }) {
  const { t } = useTranslation()
  return (
    <TabBar>
      <TabBtn type='button' data-selected={active === 'menu'} onClick={() => onChange('menu')}>
        <Label>{t('text.menu')}</Label>
      </TabBtn>
      <TabBtn type='button' data-selected={active === 'info'} onClick={() => onChange('info')}>
        <Label>{t('text.info')}</Label>
      </TabBtn>
    </TabBar>
  )
}

export default TabSection

const TabBar = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 26px;
  padding: 0 25px 0 29px; // 주황색 라인 땜에 왼쪽 여백 + 4px
  border-bottom: 1px solid #eaeaea;
`

const TabBtn = styled.button`
  position: relative;
  border: none;
  background: transparent;
  padding: 8px 0;
  cursor: pointer;
  color: #000;
  font-size: 0.875rem;
  font-weight: 700;
`

// 선택된 탭 밑에 주황색 라인
const Label = styled.span`
  position: relative;
  display: inline-block;

  ${TabBtn}[data-selected='true'] &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 8px); // 텍스트보다 8px 길게
    bottom: -10px;
    height: 4px;
    background: #f08e67;
    border-radius: 4px;
  }
`
