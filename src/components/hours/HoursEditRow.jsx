// src/features/hours/HoursEditRow.jsx
import React from 'react'
import styled from 'styled-components'
export default function HoursEditRow({ label, item, onOpenClick, onCloseClick, onClosedToggle }) {
  return (
    <Row>
      <div></div>
      <div style={{ fontWeight: 600, fontSize: '18px' }}>{label}</div>
      <div></div>
      <CellBtn disabled={item.closed} onClick={onOpenClick}>
        {item.open ?? '  :  '}
      </CellBtn>
      <div></div>
      <CellBtn disabled={item.closed} onClick={onCloseClick}>
        {item.close ?? '  :  '}
      </CellBtn>
      <div></div>
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox checked={item.closed} onChange={(e) => onClosedToggle(e.target.checked)} />
      </label>
    </Row>
  )
}
const Row = styled.div`
  display: grid;
  grid-template-columns: 30px 47px 25px 85px 21px 85px 33px 24px; //320
  align-items: center;
  padding: 15px 0 15px 0;
`
export const CellBtn = styled.button`
  width: 85px;
  height: 30px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #f08e67;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  text-align: center;
  line-height: 30px;

  &:disabled {
    opacity: 0.4;
    color: #888;
  }
`
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 24px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.4);

  background: #fff;

  &:checked {
    background-color: #f08e67;
    border: none;
  }
`
