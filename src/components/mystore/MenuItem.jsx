import React from 'react'
import styled from 'styled-components'
import skipButton from '@/assets/button-skip.svg'

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  aspect-ratio: 1/1;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`
const TxtContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 9%;
`

const Text = styled.p`
  color: #000;
  font-size: 20px;
  font-weight: 600;
`

const SmallText = styled.p`
  color: #5b5b5b;
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
`

const Arrow = styled.img`
  padding-right: 3%;
`

function MenuItem({ img, text, smallText, onClick }) {
  return (
    // 클릭하면 페이지 이동
    <ItemContainer onClick={onClick}>
      <Container>
        <Icon src={img} alt=''></Icon>
        <TxtContainer>
          <Text>{text}</Text>
          <SmallText>{smallText}</SmallText>
        </TxtContainer>
      </Container>
      <Arrow src={skipButton} alt='' />
    </ItemContainer>
  )
}

export default MenuItem
