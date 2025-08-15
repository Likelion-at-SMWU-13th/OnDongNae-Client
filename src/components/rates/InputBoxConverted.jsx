import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'JPY', symbol: '¥' },
  { code: 'CNY', symbol: '¥' },
]

const InputBoxConverted = ({ currency, onCurrency, converted, exchangeRate }) => {
  const { t } = useTranslation()

  // 화폐 단위
  const symbol = useMemo(() => {
    const f = CURRENCIES.find((c) => c.code === currency)
    return f ? f.symbol : ''
  }, [currency])

  // converted 값이 숫자인지 확인인지 체크
  const hasValue = useMemo(() => {
    if (converted == null) return false
    const s = String(converted).trim()
    if (s === '') return false
    return !Number.isNaN(Number(s))
  }, [converted])

  // exchangeRate 결과
  const rateText = useMemo(() => {
    return `₩1,000 = ${symbol}${(1000 * exchangeRate).toFixed(2)}`
  }, [exchangeRate, symbol])

  return (
    <>
      <Box data-has-value={hasValue ? 'true' : 'false'}>
        <Contents>
          <Row>
            <Title>{t('rates.to')}</Title>

            <BtnGroup>
              {CURRENCIES.map((c) => {
                const isActive = currency === c.code
                return (
                  <CurrencyBtn
                    key={c.code}
                    type='button'
                    onClick={() => onCurrency && onCurrency(c.code)}
                    data-active={isActive}
                  >
                    {t(`rates.${c.code}`, c.code)}
                  </CurrencyBtn>
                )
              })}
            </BtnGroup>
          </Row>

          <InputContainer>
            <Unit>{symbol}</Unit>
            <Input value={converted} readOnly placeholder='0.00' />
          </InputContainer>
        </Contents>
      </Box>

      <ResultRate data-active={hasValue && typeof exchangeRate === 'number' ? 'true' : 'false'}>
        <Text>{t('rates.rate')}</Text>
        <Rate>{rateText || ''}</Rate>
      </ResultRate>
    </>
  )
}

export default InputBoxConverted

const Box = styled.div`
  margin-top: 18px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  border: 3px solid rgba(0, 0, 0, 0.3);
  background: #fff;

  &[data-has-value='true'] {
    border: 3px solid #f08e67;
  }
`

const Contents = styled.div`
  margin: 20px auto 22px auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 87%;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 12px; // 일본어, 중국어처럼 다음줄로 밀렸을 때 간격
`

const Title = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: 600;
`

const BtnGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`
const CurrencyBtn = styled.button`
  padding: 5px 10px;
  border-radius: 30px;
  border: 1px solid #b3b3b3;
  color: #000;
  background: #fff;
  font-size: 14px;
  font-weight: 400;

  &&[data-active='true'] {
    border-radius: 30px;
    border: 1px solid #f08e67;
    background: #f08e67;
    color: #fff;
  }
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

const ResultRate = styled.div`
  width: 100%;
  padding: 15px 23px;
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border-radius: 0 0 10px 10px;
  border-right: 3px solid rgba(0, 0, 0, 0.3);
  border-left: 3px solid rgba(0, 0, 0, 0.3);
  border-bottom: 3px solid rgba(0, 0, 0, 0.3);
  background: #fff;

  /* 값 있을 때 - 오렌지 배경/글자 흰색 */
  &[data-active='true'] {
    border-right: 3px solid #f08e67;
    border-left: 3px solid #f08e67;
    border-bottom: 3px solid #f08e67;
    background: #f08e67;
    color: #fff;
  }

  & > span {
    font-weight: 600;
  }
  & > strong {
    font-weight: 700;
  }
`
const Text = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 500;
`

const Rate = styled.p`
  color: #fff;

  font-feature-settings: 'dlig' on;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 131.25% */
`
