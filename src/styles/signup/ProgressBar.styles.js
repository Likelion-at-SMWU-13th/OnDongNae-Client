import styled from 'styled-components'

export const WholeBar = styled.div`
  position: relative;
  width: 88%;
  margin: 43px auto 0;
`

export const BackBar = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
  background: #d9d9d9;
  border-radius: 999px;
  overflow: hidden;
`

export const FillBar = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  background: #f08e67;
  transition: width 320ms ease;
`

export const Logo = styled.img`
  position: absolute;
  top: -18.5px; // (42 - 5) / 2 = 18.5 → 바 중앙에 맞추는 보정
  transition: left 320ms ease;
`
