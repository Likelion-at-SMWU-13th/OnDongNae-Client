import React from 'react'
import styled from 'styled-components'
import skipButton from '@/assets/button-skip.svg'

function MenuItem({ img, text, onClick }) {
  return (
    // 클릭하면 페이지 이동
    <ItemContainer onClick={onClick}>
      <Icon src={img} alt='' />
      <Text>{text}</Text>
      <Arrow src={skipButton} alt='' />
    </ItemContainer>
  )
}

export default MenuItem

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #b1b1b1;
  padding: 15px 0 21px 13px;
  margin-top: 20px;
  background: #fff;
`

const Icon = styled.img`
  width: 43px;
  height: 43px;
  flex-shrink: 0;
`

const Text = styled.p`
  color: #000;
  font-size: 1.25rem;
  font-weight: 600;
  padding-left: 10%;
`

const Arrow = styled.img`
  padding-left: 42%;
`
