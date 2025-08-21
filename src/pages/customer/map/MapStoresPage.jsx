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
import Loading from '@/components/common/Loading'

const MapStoresPage = () => {
  const { storeId } = useParams()
  const { t, i18n } = useTranslation()
  const [store, setStore] = useState() // url에서 id 정보 추출
  const [tab, setTab] = useState('menu') // 일단 메뉴탭 보여주기
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchStore = async () => {
      setIsLoading(true)
      try {
        const lang = (i18n.language || 'en').split('-')[0]
        const response = await axios.get(`${apiUrl}/stores/${storeId}`, {
          headers: { 'Accept-Language': lang },
        })
        setStore(response?.data?.data ?? null)
        console.log(response?.data?.data)
        setError(null)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }
    if (storeId) fetchStore()
  }, [storeId, i18n.language, apiUrl])
  if (isLoading) {
    return (
      <S.LoadingOverlay>
        <Loading />
      </S.LoadingOverlay>
    )
  }

  return (
    <>
      <Header img={backIcon} title={t('header.storeDetails')} showImg />
      <S.Main>
        <S.Scroll className='scrollable'>
          {/* 사진 영역 */}
          <ImgSection imgs={store?.header?.images || []} />
          {/* 가게 정보 영역 */}
          <HeaderSection header={store?.header} />
          {/* 지도 영역*/}
          <MapSection header={store?.map} />
          {/* 탭 */}
          <TabSection active={tab} onChange={setTab} />
          {/* 탭 콘텐츠 */}
          {tab === 'menu' ? (
            <MenuTab items={store?.menuTab || []} />
          ) : (
            <InfoTab info={store?.infoTab || {}} />
          )}
        </S.Scroll>
      </S.Main>
      <CustomerBottomNav />
    </>
  )
}

export default MapStoresPage
