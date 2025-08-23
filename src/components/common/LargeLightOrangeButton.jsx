import React from 'react'
import styled from 'styled-components'

function LargeLightOrangeButton({ label, onBtnClick }) {
  return <Button onClick={onBtnClick}>{label}</Button>
}

export default LargeLightOrangeButton

const Button = styled.button`
  width: 82.56%;
  padding: 12.28px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  background-color: #feb99d;
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 0 auto;
`
