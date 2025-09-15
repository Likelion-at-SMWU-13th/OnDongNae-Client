import React from 'react'
import styled from 'styled-components'

function LargeOrangeButton({ label, onBtnClick }) {
  return <Button onClick={onBtnClick}>{label}</Button>
}

export default LargeOrangeButton

const Button = styled.button`
  width: 82.56%;
  padding: 12.28px 0;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 10px;
  background-color: rgba(240, 142, 103, 1);
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 0 auto;
`
