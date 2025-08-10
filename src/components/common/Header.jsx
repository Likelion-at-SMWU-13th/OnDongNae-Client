import React from 'react'
import styled from 'styled-components'
import backIcon from '@/assets/button-back.svg'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 10px 15px 0;
  border-bottom: 1px solid #f1f1f1;
`
const Img = styled.img`
  padding-left: 10px;
`

const Title = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  padding-left: 129px;
`

function Header({ img, title, showImg }) {
  return (
    <>
      <HeaderContainer>
        {showImg && <Img src={backIcon} alt='뒤로가기' />}
        <Title> {title}</Title>
      </HeaderContainer>
    </>
  )
}

export default Header
