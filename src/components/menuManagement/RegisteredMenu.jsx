// src/components/menuManagement/RegisteredMenu.jsx
import React from 'react'
import styled from 'styled-components'

const RegisteredMenu = ({ nameKo, priceKrw, allergies = [] }) => {
  return (
    <Content>
      <RowWrapper>
        <MenuName>{nameKo}</MenuName>
        <PriceWrapper>
          <Won>₩</Won>
          <MenuPrice>{priceKrw}</MenuPrice>
        </PriceWrapper>
      </RowWrapper>
      <MenuAllergens>{(allergies ?? []).join(', ')}</MenuAllergens>
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
  line-height: 21px;
`
const MenuPrice = styled.span`
  color: #000;
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
`
const MenuAllergens = styled.span`
  color: #000;
  font-size: 17px;
  font-weight: 400;
`
