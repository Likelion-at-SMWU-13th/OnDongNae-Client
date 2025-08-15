// 더미데이터 연동 후 삭제
import detailDummyData from './detailDummyData'
import React, { useEffect, useState } from 'react'
import * as S from '@/styles/map/MapStoresPage.styles'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'

import ImgSection from '@/components/map/ImgSection'
import HeaderSection from '@/components/map/HeaderSection'
import MapSection from '@/components/map/MapSection'
import TabSection from '@/components/map/TabSection'
import MenuTab from '@/components/map/MenuTab'
import InfoTab from '@/components/map/InfoTab'

const MapStoresPage = () => {
  const { t } = useTranslation()
  const { data } = detailDummyData
  const [tab, setTab] = useState('menu') // 일단 메뉴탭 보여주기

  return (
    <>
      <Header img={backIcon} title={t('header.storeDetails')} showImg={true} />
      {/* 스크롤 영역 */}
      <S.Main>
        <S.Scroll className='scrollable'>
          {/* 사진 영역 */}
          <ImgSection imgs={data?.header?.images} />
          {/* 가게 정보 영역 (가게명+상태+영업시간+짧은 소개글)*/}
          <HeaderSection header={data?.header} />
          {/* 지도 영역 */}
          <MapSection header={data?.map} />

          {/* 탭 */}
          <TabSection active={tab} onChange={setTab} />

          {/* 탭 (메뉴 탭 or 상세정보 탭) */}
          {tab === 'menu' ? <MenuTab items={data?.menuTab} /> : <InfoTab info={data?.infoTab} />}
        </S.Scroll>
      </S.Main>
      <CustomerBottomNav />
    </>
  )
}

export default MapStoresPage
