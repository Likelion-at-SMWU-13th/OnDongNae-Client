import React, { useEffect, useState } from 'react'
import * as S from '@/styles/rates/ExchangeRatesPage.styles'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
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
    const textPrice = (priceKr ?? '').trim()
    const cleanedPrice = textPrice.replace(/,/g, '')

    if (cleanedPrice === '') return
    const priceNum = Number(cleanedPrice)

    if (Number.isNaN(priceNum)) return // 문자 입력시 리턴

    // axios 요청
    const timer = setTimeout(() => {
      axios
        .get(`${apiUrl}/exchange`, {
          params: {
            currency: currency,
            price: priceKr,
          },
        })
        .then((res) => {
          // 백 응답 형태: { code, message, success, data: { price, exchangeRate } }
          // 변환된 금액은 res.data.data.price, 환율은 res.data.data.exchangeRate
          setConverted(res.data.data.price.toFixed(2)) // 둘째자리까지 제공
          setExchangeRate(res.data.data.exchangeRate)
        })
        .catch((err) => {
          console.error(err)
          setConverted('')
          setExchangeRate(null)
        })
    }, 100) // 사용자 입력 후, 0.1초 후 변환

    return () => clearTimeout(timer)
  }, [priceKr, currency])

  return (
    <>
      <Header img={backIcon} title={t('bottomNav.rates')} showImg={false} />
      {/* 스크롤 영역 */}
      <S.Main>
        <S.Scroll className='scrollable'>
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
        </S.Scroll>
      </S.Main>
      <CustomerBottomNav />
    </>
  )
}

export default ExchangeRatePage
