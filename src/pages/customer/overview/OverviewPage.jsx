import React from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import CustomerBottonNav from '@/components/common/CustomerBottomNav'
import { useTranslation } from 'react-i18next' // 1. import 문
import backIcon from '@/assets/button-back.svg'
import KakaoMapContainer from '@/components/common/KakaoMapContainer'
const OverviewPage = () => {
  const { t } = useTranslation() // 2. useTranslation() 선언문

  return (
    <div>
      {/* 헤더 */}
      <Header img={backIcon} title={t('header.overview')} showImg={false} />
      <KakaoMapContainer />

      <CustomerBottonNav />
    </div>
  )
}

export default OverviewPage
