import React from 'react'
import styled from 'styled-components'

function MarketCateogoryRow({
  marketLabel, // 시장 라벨명
  mainLabel, // 대분류 라벨명
  onClearMarket, // 시장 초기화
  onClearMain, // 대분류 초기화
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

export default MarketCateogoryRow

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
  font-size: 0.875rem;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`
const MainCategoryButton = styled(MarketButton)``
