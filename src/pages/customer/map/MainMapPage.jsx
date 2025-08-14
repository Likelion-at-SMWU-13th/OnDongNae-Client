import React, { useState } from 'react'
import * as S from '@/styles/map/MainMapPage.styles'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import KakaoMap from '@/components/map/KakaoMap'
const MainMapPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <Header img={backIcon} title={t('bottomNav.map')} showImg={false} />
      <CustomerBottomNav></CustomerBottomNav>
      <KakaoMap />
    </>
  )
}

export default MainMapPage
