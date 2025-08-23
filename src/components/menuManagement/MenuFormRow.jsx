import React from 'react'
import styled, { css } from 'styled-components'

const MenuFormRow = ({ name, price, onChangeName, onChangePrice }) => {
  return (
    <Row style={{ borderTop: '40px' }}>
      <Field>
        <Label>메뉴 이름</Label>
        <PrefixWrapper>
          <Input
            type='text'
            placeholder='메뉴 이름을 입력해주세요'
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
          />
        </PrefixWrapper>
      </Field>
      <Field>
        <Label>가격</Label>
        <PrefixWrapper>
          <Prefix>₩</Prefix>
          <Input
            type='number'
            placeholder='가격을 입력해주세요'
            value={price || ''}
            onChange={(e) => onChangePrice(e.target.value)}
          />
        </PrefixWrapper>
      </Field>
    </Row>
  )
}

export default MenuFormRow

const Row = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0px 0px 30px;
`
const Label = styled.label`
  color: #000;
  font-size: 19px;
  font-weight: 500;
  margin-right: 36px;
  width: 71px;
`
const Prefix = styled.span`
  color: #000;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  padding-left: 20px;
  padding-right: 5px;
`
const Field = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 18px;
  color: #2d2d2d;
  margin-bottom: 5px;
  font-weight: 400;

  ::placeholder {
    color: #bdbdbd;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const PrefixWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #f08e67;
  width: 200px;
  padding-left: 5px;
`
