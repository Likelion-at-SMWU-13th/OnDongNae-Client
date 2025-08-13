import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  width: 82.56%;
  padding: 12.28px 0;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 10px;
  background-color: #feb99d;
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 0 auto;
`

function LargeLightOrangeButton({ label, onBtnClick }) {
  return <Button onClick={onBtnClick}>{label}</Button>
}

export default LargeLightOrangeButton
