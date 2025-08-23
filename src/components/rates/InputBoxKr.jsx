import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const InputBoxKr = ({ priceKr, setPriceKr }) => {
  const { t } = useTranslation()

  // 금액 1000원 단위로 끊어서 보여주기
  const formatThousands = () => {
    if (priceKr === '' || priceKr == null) return '' // 빈값은 빈칸
    return new Intl.NumberFormat('ko-KR').format(priceKr) // 1,000,000 형식
  }

  // 숫자만 허용
  const handleChange = (v) => {
    const changeNumber = v.replace(/\D/g, '')
    setPriceKr(changeNumber)
  }

  const displayValue = formatThousands(priceKr)

  return (
    <Box>
      <Contents>
        <Title>{t('rates.swap')} </Title>
        <InputContainer>
          <Unit>₩</Unit>
          <Input
            value={displayValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder='0'
            inputMode='numeric'
            pattern='[0-9]*'
          />
        </InputContainer>
      </Contents>
    </Box>
  )
}

export default InputBoxKr

const Box = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 3px solid #f08e67;
`

const Contents = styled.div`
  margin: 20px auto 64px auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 87%;
`
const Title = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: 600;
`
const InputContainer = styled.div`
  position: relative;
`
const Unit = styled.span`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.6);
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
`
const Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 2px solid #e4e4e4;
  padding-left: 46px;
  background: #fff;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
`
