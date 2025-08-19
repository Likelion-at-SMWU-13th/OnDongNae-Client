import React from 'react'
import styled from 'styled-components'
const RegisteredMenu = () => {
  return (
    <Content>
      <RowWrapper>
        <MenuName>떡볶이</MenuName>
        <PriceWrapper>
          <Won>₩</Won>
          <MenuPrice>5000</MenuPrice>
        </PriceWrapper>
      </RowWrapper>
      <MenuAllergens>밀, 대두, 생선</MenuAllergens>
    </Content>
  )
}

export default RegisteredMenu
const Content = styled.span`
  padding-bottom: 38.5px;
`
const RowWrapper = styled.span`
  display: flex;
  justify-content: space-between;
`
const PriceWrapper = styled.div`
  display: flex;
  gap: 3px;
`
const MenuName = styled.span`
  color: #000;
  font-size: 19px;
  font-weight: 500;
  padding-bottom: 5.5px;
`
const Won = styled.span`
  color: #000;
  font-size: 15px;
  font-weight: 400;
  line-height: 21px; /* 140% */
`
const MenuPrice = styled.span`
  color: #000;
  font-size: 15px;
  font-weight: 400;
  line-height: 21px; /* 140% */
`
const MenuAllergens = styled.span`
  color: #000;
  font-size: 17px;
  font-weight: 400;
`
