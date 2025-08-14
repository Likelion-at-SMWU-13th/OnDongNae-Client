import React, { useEffect, useState } from 'react'
import * as S from '@/styles/map/MainMapPage.styles'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import SearchBar from '@/components/map/SearchBar'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import KakaoMap from '@/components/map/KakaoMap'
const MainMapPage = () => {
  const { t } = useTranslation()
  const [query, setQuery] = useState('') // 검색창
  return (
    <>
      {/* 헤더 */}
      <Header img={backIcon} title={t('bottomNav.map')} showImg={false} />
      <S.MapContainer>
        {/* 카카오 지도 */}
        <KakaoMap />
        {/*지도 위 오버레이 영역 */}
        <S.Overlay>
          {/* 검색창 */}
          <SearchBar value={query} onChange={setQuery} placeholder={t('button.search')} />
          {/* 시장 드롭다운 */}
          {/* 대분류 */}
          {/* 소분류 */}
          {/* 스크롤 영역 */}
          {/* 하단바 */}
        </S.Overlay>
      </S.MapContainer>
      <CustomerBottomNav />
    </>
  )
}

export default MainMapPage
