import React from 'react'
import styled from 'styled-components'
import iconSearch from '@/assets/icon-search.svg'

const SearchBar = ({ value, onChange, placeholder, onSubmit }) => {
  return (
    <InputContainer role='search'>
      <Icon src={iconSearch} alt='' />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSubmit) onSubmit(value.trim())
        }}
      />
    </InputContainer>
  )
}

export default SearchBar

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: 48px;
  border-radius: 10px;
  border: 2px solid #f08e67;
  background: #fff;
`

const Icon = styled.img`
  position: absolute;
  left: 20px;
  width: 24px;
  height: 24px;
  padding: 3px;
`
const Input = styled.input`
  width: 100%;
  height: 100%;
  color: #000;
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  margin: 0 20px 0 50px;
  border: none;
  outline: none;
`
