import React from 'react'
import styled from 'styled-components'
import backIcon from '@/assets/button-back.svg'
import { useNavigate } from 'react-router-dom'

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 17.5px 0 18.5px 0;
  border-bottom: 1px solid #f1f1f1;
`
const Img = styled.img`
  position: absolute; /* 항상 왼쪽에 고정 */
  left: 10px;
  cursor: pointer;
`

const Title = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`

function Header({ img, title, showImg }) {
  const navigate = useNavigate()
  return (
    <>
      <HeaderContainer>
        {showImg && <Img src={backIcon} alt='뒤로가기' onClick={() => navigate(-1)} />}
        <Title> {title}</Title>
      </HeaderContainer>
    </>
  )
}

export default Header
