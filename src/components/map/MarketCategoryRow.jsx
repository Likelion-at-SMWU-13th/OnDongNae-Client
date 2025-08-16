// src/components/map/SelectedChips.jsx
import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  // DropDown과 같은 자리
  margin-top: 13px;
  width: 90%;
`
const Row = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

// 시장버튼
const MarketButton = styled.button`
  height: 35px;
  flex-shrink: 0;
  padding: 9px 12px;
  border-radius: 30px;
  border: none;
  background: #f08e67;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.1);
`
const MainCategoryButton = styled(MarketButton)``

export default function SelectedChips({
  marketLabel, // ex) "Yongsan Yongmun Market"
  mainLabel, // ex) "Restaurants & Cafés" (없으면 표시 X)
  onClearMarket, // (선택) 시장 초기화
  onClearMain, // (선택) 대분류 초기화
}) {
  return (
    <Wrap>
      <Row>
        <MarketButton type='button' onClick={onClearMarket}>
          {marketLabel}
        </MarketButton>
        {mainLabel ? (
          <MainCategoryButton type='button' onClick={onClearMain}>
            {mainLabel}
          </MainCategoryButton>
        ) : null}
      </Row>
    </Wrap>
  )
}
