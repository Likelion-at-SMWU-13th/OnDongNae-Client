import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import KakaoMapContainer from '@/components/common/KakaoMapContainer'
import OverviewBottomScroll from '@/components/Overview/OverviewBottonScroll'
import mapMaker from '@/assets/icon-big-mapMarker.svg'

const OverviewPage = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  return (
    <Page>
      <Header title={t('header.overview')} showImg={false} />
      <MapContainer>
        <KakaoMapContainer
          level={7}
          center={{ lat: 37.533049142, lng: 126.970520625 }}
          markers={markers}
          onMarkerClick={(m) => navigate(`/user/overview/info/${m?.id}`)}
          showMarkerLabels
          getLabel={(m) => t(m.title)}
          labelYAnchor={2.4}
        />
        <OverviewBottomScroll
          onStoreClick={(item) => {
            navigate(`/user/overview/info/${item?.id ?? ''}`)
          }}
        />
      </MapContainer>
      <CustomerBottomNav />
    </Page>
  )
}

export default OverviewPage

const Page = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  min-height: 0;
`

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100dvh - 19dvh);
  min-height: 0;
  overflow: hidden;
  z-index: 0;

  > div {
    width: 100%;
    height: 100%;
  }
`
const markers = [
  {
    id: 1,
    title: 'overview.YongmunMarket',
    position: { lat: 37.536618383, lng: 126.959796815 },
    image: {
      src: mapMaker,
      size: { width: 28, height: 28 },
      options: { offset: { x: 14, y: 40 } },
    },
  },
  {
    id: 3,
    title: 'overview.huamMarket',
    position: { lat: 37.550104514133615, lng: 126.97593591802915 },
    image: {
      src: mapMaker,
      size: { width: 28, height: 28 },
      options: { offset: { x: 14, y: 40 } },
    },
  },
  {
    id: 2,
    title: 'overview.itaewonMarket',
    position: { lat: 37.53381428, lng: 126.990046559 },
    image: {
      src: mapMaker,
      size: { width: 28, height: 28 },
      options: { offset: { x: 14, y: 40 } },
    },
  },
  {
    id: 4,
    title: 'overview.manlyMarket',
    position: { lat: 37.551367465, lng: 126.963639378 },
    image: {
      src: mapMaker,
      size: { width: 28, height: 28 },
      options: { offset: { x: 14, y: 40 } },
    },
  },
  {
    id: 5,
    title: 'overview.haebangchonMarket',
    position: { lat: 37.54550342552204, lng: 126.98219607716948 },
    image: {
      src: mapMaker,
      size: { width: 28, height: 28 },
      options: { offset: { x: 14, y: 40 } },
    },
  },
]
