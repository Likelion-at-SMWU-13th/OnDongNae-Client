import React from 'react'
import styled from 'styled-components'
import hevron from '@/assets/icon-chevron-right.svg'

const Card = styled.button`
  width: 330px;
  height: 72px;
  border-radius: 10px;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.1);
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 13.5px 0px 10.5px 10px;
`
const Title = styled.p`
  color: #1a0f12;
  font-feature-settings: 'dlig' on;
  font-family: Pretendard;
  font-size: 19px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 126.316% */
`
const Desc = styled.p`
  color: #5b5b5b;
  font-feature-settings: 'dlig' on;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 140% */
`
const Left = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  text-align: left;
`
const Right = styled.div`
  padding-right: 19.41px;
`

function RegisterOptionCard({ title, desc, onClick }) {
  return (
    <Card onClick={onClick}>
      <Left>
        <div>
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
        </div>
      </Left>
      <Right>
        <Right>
          <img src={hevron} alt='다음' />
        </Right>
      </Right>
    </Card>
  )
}

export default RegisterOptionCard
