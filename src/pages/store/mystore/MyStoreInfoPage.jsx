import React, { useEffect, useState } from 'react'
import * as S from '@/styles/map/MapStoresPage.styles'
import { authAxios } from '@/lib/authAxios'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import BottomNav from '@/components/common/BottomNav'

import ImgSection from '@/components/map/ImgSection'
import HeaderSection from '@/components/map/HeaderSection'
import MapSection from '@/components/map/MapSection'
import TabSection from '@/components/map/TabSection'
import MenuTab from '@/components/map/MenuTab'
import InfoTab from '@/components/map/InfoTab'
import Loading from '@/components/common/Loading'

const MyStoreInfoPage = () => {
  const { t, i18n } = useTranslation()
  const [store, setStore] = useState()
  const [tab, setTab] = useState('menu') // 일단 메뉴탭 보여주기
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchStore = async () => {
      const lang = i18n.language
      try {
        const response = await authAxios.get(`${apiUrl}/me/store`, {
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
    fetchStore()
  }, [i18n.language])

  // 로딩 상태일 때 UI
  if (isLoading) {
    return (
      <S.LoadingOverlay>
        <Loading />
      </S.LoadingOverlay>
    )
  }

  return (
    <>
      <Header img={backIcon} title={'나의 가게'} showImg />
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
      <BottomNav />
    </>
  )
}

export default MyStoreInfoPage
