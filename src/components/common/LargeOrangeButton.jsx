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
  background-color: rgba(240, 142, 103, 1);
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 0 auto;
`

function LargeOrangeButton({ label, onBtnClick }) {
  return <Button onClick={onBtnClick}>{label}</Button>
}

export default LargeOrangeButton
