import React from 'react'
import Spinner from '@/assets/Spinner2.gif'
import styled from 'styled-components'

const Loading = ({ text }) => {
  return (
    <Content>
      <Img src={Spinner} alt='Loading' />
      <Text>{text} </Text>
    </Content>
  )
}

export default Loading

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute; /* 화면 전체 덮기 */
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(255, 255, 255); /* 반투명 흰 배경 */
  z-index: 9999; /* 페이지 가장 위 */
`
const Text = styled.p`
  text-align: center;
  color: #000;
  font-size: 19px;
  font-weight: 500;
  margin-top: 5dvh;
`
const Img = styled.img`
  width: 110px;
  display: flex;
  align-items: center;
`
