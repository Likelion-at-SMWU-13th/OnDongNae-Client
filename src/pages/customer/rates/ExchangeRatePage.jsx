import React, { useEffect, useState } from 'react'
import * as S from '@/styles/rates/ExchangeRatesPage.styles'
import * as C from '@/styles/common/CustomerBottomNav.styles'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import debounce from 'lodash.debounce' // 가격 입력 시, 매번 환율 api 호출되는 것 막기
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import InputBoxKr from '@/components/rates/InputBoxKr'
import InputBoxConverted from '@/components/rates/InputBoxConverted'
import RatesDescription from '@/components/rates/RatesDescription'
import iconArrow from '@/assets/icon-circle-down-arrow.svg'

const ExchangeRatePage = () => {
  const { t } = useTranslation()
  const [currency, setCurrency] = useState('') // 통화단위 설정
  const [priceKr, setPriceKr] = useState('') // 원단위 금액
  const [converted, setConverted] = useState('') // 바뀐 금액
  const [exchangeRate, setExchangeRate] = useState(null) // 환율
  const apiUrl = import.meta.env.VITE_API_URL

  // 원단위 금액이나 화폐단위 바뀌면 실행
  useEffect(() => {
    const getRate = debounce((currency, price) => {
      axios
        .get(`${apiUrl}/exchange`, {
          params: {
            currency,
            price,
          },
        })
        .then((res) => {
          setConverted(res.data.data.price.toFixed(2)) // 둘째자리까지 제공
          setExchangeRate(res.data.data.exchangeRate)
        })
        .catch((err) => {
          console.error(err)
          setConverted('')
          setExchangeRate(null)
        })
    }, 250) // 입력 멈추고 0.25초 뒤에 get 호출

    const cleanedPrice = (priceKr ?? '').replace(/,/g, '') // 가격에서 쉼표 제거
    if (cleanedPrice && !isNaN(Number(cleanedPrice))) {
      getRate(currency, cleanedPrice)
    }

    return () => getRate.cancel() // 이전의 debounce 타이머 취소
  }, [priceKr, currency])

  return (
    <>
      <Header img={backIcon} title={t('bottomNav.rates')} showImg={false} />
      {/* 스크롤 영역 */}
      <C.Main>
        <C.Scroll className='scrollable'>
          <S.BoxContainer>
            {/* Input 박스 1 */}
            <InputBoxKr priceKr={priceKr} setPriceKr={setPriceKr} />
            <S.Arrow>
              <img src={iconArrow} alt='' aria-hidden='true' />
            </S.Arrow>
            {/* Input 박스 2 */}
            <InputBoxConverted
              currency={currency}
              onCurrency={setCurrency}
              converted={converted}
              exchangeRate={exchangeRate}
            />
            {/* 설명문 */}
            <RatesDescription />
          </S.BoxContainer>
        </C.Scroll>
      </C.Main>
      <CustomerBottomNav />
    </>
  )
}

export default ExchangeRatePage
