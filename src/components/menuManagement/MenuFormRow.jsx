import React from 'react'
import styled, { css } from 'styled-components'

const Row = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  align-self: center;
  color: #000;
  font-size: 19px;
  font-weight: 500;
`
const Prefix = styled.span`
  color: #000;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
`
const Field = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  color: #2d2d2d;
  border-bottom: 1px solid #f08e67;
  padding-top: 5px;
  ::placeholder {
    color: #bdbdbd;
  }
`

const MenuFormRow = ({ name, price, onChangeName, onChangePrice }) => {
  return (
    <Row style={{ borderTop: '40px' }}>
      <Field>
        <label>메뉴 이름</label>
        <Input
          type='text'
          placeholder='메뉴 이름을 입력해주세요'
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
        />
      </Field>
      <Field>
        <label>가격</label>
        <Prefix>₩</Prefix>
        <Input
          type='number'
          placeholder='가격을 입력해주세요'
          value={price || ''}
          onChange={(e) => onChangePrice(e.target.value)}
        />
      </Field>
    </Row>
  )
}

export default MenuFormRow
