// 더미데이터 관련 부분 연동 후 삭제 (dummy, 더미, 삭제로 검색하기)
import dummyData from './dummyData'
import React, { useEffect, useState } from 'react'
import * as S from '@/styles/map/MainMapPage.styles'
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
import KakaoMap from '@/components/common/KakaoMap'
import iconMarker from '@/assets/icon-default-marker.svg'
const DEFAULT_CENTER = { lat: 37.5326, lng: 126.9905 } // 기본 좌표
const DEFAULT_LEVEL = 6 // 기본 확대 정도
// 시장 좌표
const MARKET_COORDS = {
  1: { lat: 37.536618383, lng: 126.959796815 }, // 용산용문시장
  2: { lat: 37.5338328, lng: 126.990036559 }, // 이태원시장
  3: { lat: 37.550302514133315, lng: 126.97609391600915 }, // 후암재래시장
  4: { lat: 37.551207465, lng: 126.963509378 }, // 만리시장
  5: { lat: 37.54531342552204, lng: 126.98498907716948 }, // 해방촌 신흥시장
}

const MainMapPage = () => {
  const { t, i18n } = useTranslation()
  const [query, setQuery] = useState('') // 검색창
  const [market, setMarket] = useState(null) // 드롭다운 선택 값
  const [markets, setMarkets] = useState([]) // 드롭다운 리스트
  const [categories, setCategories] = useState([]) // 대분류 리스트
  const [subCategories, setSubCategories] = useState([]) // 소분류 리스트
  const [randomStores, setRandomStores] = useState([]) // 랜덤 가게 리스트
  const [selectedStores, setSelectedStores] = useState([]) // 사용자 선택 가게 리스트
  const [selectedMainId, setSelectedMainId] = useState(null) // 선택된 대분류 ID (단일 선택)
  const [selectedSubIds, setSelectedSubIds] = useState([]) // 선택된 소분류 ID (복수 선택)
  const [center, setCenter] = useState(DEFAULT_CENTER) // 지도 중심 상태
  const [level, setLevel] = useState(DEFAULT_LEVEL) // 지도 확대 정도
  const [markers, setMarkers] = useState([]) // 마커 배열

  /* 맨 처음 지도 가져오기
    useEffect(() => {
    // 'en-US' -> 'en' 형태로 변환
    const lang = (i18n.language || 'en').split('-')[0]


    axios
      .get('http://127.0.0.1:8000/map', {
        headers: { 'Accept-Language': lang },
      })
      .then((response) => {
        const data = response?.data?.data
        if (!data) return

        setMarkets(data.marketOptions || [])
        setCategories(data.categoryOptions || [])
        setRandomStores(data.randomStores || [])
      })
      .catch((error) => {
        console.log(error)
        alert('데이터 불러오기에 실패했습니다.')
      })
  }, [i18n.language]) 
  */

  /* 사용자가 특정 시장, 대분류, 소분류 선택 시*/
  useEffect(() => {
    const hasMarket = !!market?.value
    const hasMain = !!selectedMainId
    const hasSub = Array.isArray(selectedSubIds) && selectedSubIds.length > 0
    if (!hasMarket && !hasMain && !hasSub) {
      // 아무것도 선택 안되면 호출 x
      setSelectedStores([])
      return
    }

    // 언어 헤더 가져오기
    const lang = (i18n.language || 'en').split('-')[0]

    // 쿼리 파라미터 (하나라도 있으면 params에 추가)
    const params = {}
    if (hasMarket) params.market = market.value
    if (hasMain) params.main = selectedMainId
    if (hasSub) params.sub = selectedSubIds
    axios
      .get('http://127.0.0.1:8000/map/filter', {
        params,
        paramsSerializer: { indexes: null }, // sub=7&sub=8 형태
        headers: { 'Accept-Language': lang },
      })
      .then((res) => {
        const result = res.data.data
        // result 배열 형태로 만들어주기
        const list = result ? (Array.isArray(result) ? result : [result]) : []
        setSelectedStores(list)

        // 결과 리스트 마커로 모두 찍기
        // 마커 객체에 가게 데이터(s) 그대로 같이 들고 다닐 수 있게 설정 (data:s)
        const storeMarkers = list.map((s) => ({
          id: `store-${s.id}`,
          position: { lat: s.lat, lng: s.lng },
          image: { src: iconMarker, size: { width: 28, height: 28 } },
          data: s,
        }))

        setMarkers(storeMarkers)
      })
      .catch((err) => {
        console.log(err)
        setSelectedStores([])
        setMarkers([])
      })
  }, [market?.value, selectedMainId, selectedSubIds, i18n.language])

  // 연동 후 삭제
  useEffect(() => {
    setMarkets(dummyData.data.marketOptions)
    setCategories(dummyData.data.categoryOptions)
    setRandomStores(dummyData.data.randomStores)
  }, [])

  // 시장이 바뀌면 대/소분류 선택 초기화 & 지도 이동
  const handleChangeMarket = (opt) => {
    setMarket(opt) // opt = { label, value }
    setSelectedMainId(null) // 대분류 초기화
    setSubCategories([]) // 소분류 초기화

    const mapped = MARKET_COORDS[opt.value]
    if (mapped) {
      setCenter(mapped)
      setLevel(3)
      setMarkers([
        {
          id: `market-${opt.value}`,
          position: mapped,
          image: { src: iconMarker, size: { width: 31, height: 31 } },
          data: { type: 'market', label: opt.label },
        },
      ])
    } else {
      setCenter(DEFAULT_CENTER)
      setLevel(DEFAULT_LEVEL)
      setMarkers([])
    }
  }

  // 대분류 클릭 시, 소분류 세팅
  const handleSelectMain = (mainCategoryId) => {
    setSelectedMainId(mainCategoryId)
    const found = categories.find((c) => c.mainCategoryId === mainCategoryId)
    setSubCategories(found ? found.subCategories : [])
  }

  // 소분류 버튼 선택+해제
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
        <KakaoMap center={center} level={level} markers={markers} />
        {/* 스크롤 영역 -> 아무것도 선택 안되면 랜덤 가게, 선택되면 선택된 가게 정보*/}
        <ScrollArea
          title={t('dropdown.stores')}
          randomStores={
            market?.value
              ? selectedStores.length
                ? selectedStores
                : dummyData.data.randomStores
              : dummyData.data.randomStores
          } // 선택 없을 때 노출
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
            onChange={handleChangeMarket}
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
