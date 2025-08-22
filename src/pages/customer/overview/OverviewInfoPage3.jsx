import React from 'react'
import { useTranslation } from 'react-i18next'
import Header from '@/components/common/Header'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import styled from 'styled-components'
import parkingIcon from '@/assets/icon-parking.svg'
import restroomIcon from '@/assets/icon-restroom.svg'
import marketImage from '@/assets/img-market-big-huam.png'
import locationIcon from '@/assets/icon-location.svg'
import phoneIcon from '@/assets/icon-phone-call.svg'
import KakaoMapContainer from '@/components/common/KakaoMapContainer'
import mapMaker from '@/assets/icon-big-mapMarker.svg'

const Main = styled.main`
  height: calc(100dvh - 175px);
  display: flex;
  flex-direction: column;
  min-height: 0;
`

const Scroll = styled.div`
  overflow-y: auto; /* ⬅️ 반드시 필요 */
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간을 차지 */
  min-height: 0; /* 내부에 overflow가 먹히게 하는 핵심 */
  /* overflow-y는 전역 .scrollable에서 적용됨 */
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0px));
`

const MarketImg = styled.img`
  width: 390px;
  height: 218px;
  flex-shrink: 0;
`
const TitleWrapper = styled.div`
  margin: 15px 0 0 30px;
  color: #1a0f0f;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 127.273% */
`
const LocationIcon = styled.img`
  margin: 15px 0 0 30px;
  width: 25px;
  height: 25px;
`
const PhoneIcon = styled.img`
  margin: 15px 0 0 30px;
  width: 25px;
  height: 25px;
`
const AdressInfo = styled.div`
  margin: 19px 0 0 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const InfoWrapper = styled.div`
  display: flex;
  gap: 5px;
`
const CommonInfoWrapper = styled.div`
  display: flex;
  gap: 15px;
`
const InfoTitle = styled.div`
  margin: 20px 0 0 25px;
  color: #1a0f0f;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px; /* 150% */
`
const InfoContent = styled.div`
  margin: 2px 25px 0 25px;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
`
const OverviewInfoPage3 = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Header title={t('header.overview')} showImg={true} />
      <Main>
        <Scroll>
          <MarketImg src={marketImage} alt='' />
          <TitleWrapper>{t('overview.huamMarket')}</TitleWrapper>
          <InfoWrapper>
            <LocationIcon src={locationIcon} alt='위치 아이콘'></LocationIcon>
            <AdressInfo>{t('overviewInfo.adress3')} </AdressInfo>
          </InfoWrapper>
          <InfoWrapper>
            <PhoneIcon src={phoneIcon} alt='전화 아이콘'></PhoneIcon>
            <AdressInfo>{t('overviewInfo.call3')} </AdressInfo>
          </InfoWrapper>
          <KakaoMapContainer
            center={{ lat: 37.536618383, lng: 126.959796815 }}
            level={4}
            style={{
              width: '339px',
              height: '201px',
              margin: '15px auto 0 auto',
              borderRadius: '20px',
              flexShrink: 0, // 없으면 맵이 화면에 나오지 않음
            }}
            markers={[
              {
                id: 1,
                position: { lat: 37.536618383, lng: 126.959796815 },
                image: {
                  src: mapMaker,
                  size: { width: 28, height: 28 },
                  options: { offset: { x: 15, y: 31 } }, // ✅ 마커 중앙 정렬 위해 anchor 지정
                },
              },
            ]}
            showMarkerLabels={true}
            getLabel={(m) => '후암재래시장'}
            labelYAnchor={-0.5}
          />
          <InfoTitle>{t('overviewInfo.Introduction')}</InfoTitle>
          <InfoContent>{t('overviewInfo.Introduction3')}</InfoContent>
          <InfoTitle>{t('overviewInfo.characteristics')}</InfoTitle>
          <InfoContent>{t('overviewInfo.characteristics3')}</InfoContent>
          <CommonInfoWrapper>
            <LocationIcon src={restroomIcon} alt='화장실 아이콘'></LocationIcon>
            <AdressInfo>{t('overviewInfo.restroomUnavailable')} </AdressInfo>
          </CommonInfoWrapper>
          <CommonInfoWrapper>
            <PhoneIcon src={parkingIcon} alt='주차 아이콘'></PhoneIcon>
            <AdressInfo>{t('overviewInfo.parkingAvailable')} </AdressInfo>
          </CommonInfoWrapper>
          <InfoTitle>{t('overviewInfo.eventAndActivities')}</InfoTitle>
          <InfoContent>{t('overviewInfo.eventAndActivities3')}</InfoContent>
        </Scroll>
      </Main>
      <CustomerBottomNav />
    </div>
  )
}

export default OverviewInfoPage3
