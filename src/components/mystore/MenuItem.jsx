import React from 'react'
import styled from 'styled-components'
import skipButton from '@/assets/button-skip.svg'

function MenuItem({ img, text, smallText, onClick }) {
  return (
    // 클릭하면 페이지 이동
    <ItemContainer onClick={onClick}>
      <Icon src={img} alt=''></Icon>
      <TxtContainer>
        <Text>{text}</Text>
        <SmallText>{smallText}</SmallText>
      </TxtContainer>
      <Arrow src={skipButton} alt='' />
    </ItemContainer>
  )
}

export default MenuItem

const ItemContainer = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  border: none;
  border-bottom: 1px solid #f1f1f1;
  justify-content: space-between;
  padding: 23px 0 23px 13px;
  background: #fff;
  text-align: left;
  cursor: pointer;
`

const Icon = styled.img`
  width: 43px;
  height: 43px;
  flex-shrink: 0;
`

const TxtContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 9%;
  flex-grow: 1;
`

const Text = styled.p`
  color: #000;
  font-size: 1.25rem;
  font-weight: 600;
`

const SmallText = styled.p`
  color: #5b5b5b;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 21px;
`

const Arrow = styled.img`
  padding-right: 3%;
`
