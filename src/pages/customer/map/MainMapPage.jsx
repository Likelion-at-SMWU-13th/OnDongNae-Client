// 더미데이터 연동 후 삭제 !!!
import dummyData from './dummyData'
import React, { useEffect, useState } from 'react'
import * as S from '@/styles/map/MainMapPage.styles'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import SearchBar from '@/components/map/SearchBar'
import DropDown from '@/components/map/DropDown'
import MainCategories from '@/components/map/MainCategories'
import SubCategories from '@/components/map/SubCategories'
import ScrollArea from '@/components/map/ScrollArea'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import KakaoMap from '@/components/map/KakaoMap'

const MainMapPage = () => {
  const { t } = useTranslation()
  const [query, setQuery] = useState('') // 검색창
  const [market, setMarket] = useState(null) // 드롭다운 선택 값
  const [markets, setMarkets] = useState([]) // 드롭다운 리스트
  const [categories, setCategories] = useState([]) // 대분류 리스트
  const [subCategories, setSubCategories] = useState([]) // 소분류 리스트
  const [randomStores, setRandomStores] = useState([]) // 랜덤 가게 리스트

  const [selectedMainId, setSelectedMainId] = useState(null) // 선택된 대분류 ID (단일 선택)
  const [selectedSubIds, setSelectedSubIds] = useState([]) // 선택된 대분류 ID (복수 선택)

  useEffect(() => {
    // 실제 API 연동 전, dummyData 세팅
    setMarkets(dummyData.data.marketOptions)
    setCategories(dummyData.data.categoryOptions)
    setRandomStores(dummyData.data.randomStores)
  }, [])

  // 시장이 바뀌면 대/소분류 선택 초기화
  const handleChangeMarket = (opt) => {
    setMarket(opt) // opt = { label, value }
    setSelectedMainId(null) // 대분류 초기화
    setSubCategories([]) // 소분류 초기화
  }

  // 대분류 클릭 시 소분류 세팅
  const handleSelectMain = (mainCategoryId) => {
    setSelectedMainId(mainCategoryId)
    const found = categories.find((c) => c.mainCategoryId === mainCategoryId)
    setSubCategories(found ? found.subCategories : [])
  }

  const handleToggleSub = (id) => {
    setSelectedSubIds(
      (prev) =>
        prev.some((v) => String(v) === String(id))
          ? prev.filter((v) => String(v) !== String(id)) // 선택 해제
          : [...prev, id], // 선택 추가
    )
  }

  return (
    <>
      {/* 헤더 */}
      <Header img={backIcon} title={t('bottomNav.map')} showImg={false} />
      <S.MapContainer>
        {/* 카카오 지도 */}
        <KakaoMap />
        {/* 스크롤 영역 */}
        <ScrollArea
          title='Stores'
          randomStores={dummyData.data.randomStores} // 선택 없을 때 노출
          categories={categories}
          selectedMainId={selectedMainId}
          selectedSubIds={selectedSubIds}
          onStoreClick={(id) => console.log('store click:', id)}
        />

        {/*지도 위 오버레이 영역 */}
        <S.Overlay>
          {/* 검색창 */}
          <SearchBar value={query} onChange={setQuery} placeholder={t('button.search')} />
          {/* 시장 드롭다운 */}
          <DropDown
            value={market}
            onChange={setMarket}
            placeholder={t('dropdown.select')}
            options={markets.map((m) => ({ label: m.name, value: m.id }))}
          />
          {/* 시장 선택시 -> 대분류 */}
          {market && (
            <MainCategories
              market={market}
              categories={categories}
              selectedMainId={selectedMainId}
              onSelectMain={handleSelectMain}
            />
          )}
          {/* 소분류 */}
          {subCategories.length > 0 && (
            <SubCategories
              subCategories={subCategories}
              selectedSubIds={selectedSubIds}
              onToggleSub={handleToggleSub}
            />
          )}
        </S.Overlay>
      </S.MapContainer>
      {/* 하단바 */}
      <CustomerBottomNav />
    </>
  )
}

export default MainMapPage
