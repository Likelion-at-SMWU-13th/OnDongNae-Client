import React from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import { useTranslation } from 'react-i18next'
import backIcon from '@/assets/button-back.svg'
import KakaoMapContainer from '@/components/common/KakaoMapContainer'
import OverviewBottomScroll from '@/components/common/Overview/OverviewBottomScroll'
import { useNavigate } from 'react-router-dom'

// 실제 컴포넌트의 픽셀값으로 교체하세요
const HEADER_H = 50
const TABBAR_H = 50

const Page = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  min-height: 0; /* flex 컨텍스트에서 자식 스크롤 계산 깨짐 방지 */
`

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100dvh - ${HEADER_H + TABBAR_H}px);
  min-height: 0;
  overflow: hidden;
  z-index: 0;

  /* 카카오맵 루트 div가 100% 채우게 강제 */
  > div {
    width: 100%;
    height: 100%;
  }
`

const OverviewPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Page>
      <Header img={backIcon} title={t('overview.title')} showImg={false} />

      <MapContainer>
        <KakaoMapContainer />

        <OverviewBottomScroll
          bottomOffset={TABBAR_H}
          onStoreClick={(item) => {
            navigate(`/user/map/store/${item?.id ?? ''}`)
          }}
        />
      </MapContainer>

      <CustomerBottomNav />
    </Page>
  )
}

export default OverviewPage
