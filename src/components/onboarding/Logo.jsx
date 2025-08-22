import React from 'react'
import styled from 'styled-components'

const Logo = () => {
  return (
    <>
      <LogoTxt>GoruGoru</LogoTxt>
    </>
  )
}

export default Logo

const LogoTxt = styled.p`
  color: #fa6432;

  text-align: center;
  font-size: 30px;
  font-weight: 700;
  line-height: 35px;
`
