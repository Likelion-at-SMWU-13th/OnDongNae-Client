import React, { useEffect, useState } from 'react'
import * as S from '@/styles/map/MapStoresPage.styles'
import { useNavigate, useParams } from 'react-router-dom'
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
  const { storeId } = useParams()
  const { t, i18n } = useTranslation()
  const [store, setStore] = useState(null) // url에서 id 정보 추출
  const [tab, setTab] = useState('menu') // 일단 메뉴탭 보여주기

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const lang = (i18n.language || 'en').split('-')[0]

    axios
      .get(`${apiUrl}/store/${storeId}`, {
        headers: { 'Accept-Language': lang },
      })
      .then((res) => {
        setStore(res.data.data)
      })
      .catch((err) => {
        alert('가게 정보를 불러오지 못했어요.')
        console.log(err)
      })
  }, [storeId, i18n.language])

  return (
    <>
      <Header img={backIcon} title={t('header.storeDetails')} showImg={true} />
      {/* 스크롤 영역 */}
      <S.Main>
        <S.Scroll className='scrollable'>
          {/* 사진 영역 */}
          <ImgSection imgs={store.header.images ?? []} />
          {/* 가게 정보 영역 (가게명+상태+영업시간+짧은 소개글)*/}
          <HeaderSection header={store.header} />
          {/* 지도 영역 */}
          <MapSection header={store.map} />

          {/* 탭 */}
          <TabSection active={tab} onChange={setTab} />

          {/* 탭 (메뉴 탭 or 상세정보 탭) */}
          {tab === 'menu' ? <MenuTab items={store.menuTab} /> : <InfoTab info={store.infoTab} />}
        </S.Scroll>
      </S.Main>
      <CustomerBottomNav />
    </>
  )
}

export default MapStoresPage
