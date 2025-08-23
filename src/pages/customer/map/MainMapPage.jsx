import React, { useEffect, useState } from 'react'
import * as S from '@/styles/map/MainMapPage.styles'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import Header from '@/components/common/Header'
import SearchBar from '@/components/map/SearchBar'
import DropDown from '@/components/map/DropDown'
import MarketCategoryRow from '@/components/map/MarketCategoryRow'
import MainCategories from '@/components/map/MainCategories'
import SubCategories from '@/components/map/SubCategories'
import ScrollArea from '@/components/map/ScrollArea'
import KakaoMap from '@/components/common/KakaoMapContainer'
import iconMarker from '@/assets/icon-big-mapMarker.svg'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import Loading from '@/components/common/Loading'

// 지도 기본값
const DEFAULT_CENTER = { lat: 37.5326, lng: 126.9905 } // 기본 좌표
const DEFAULT_LEVEL = 6 // 기본 확대 정도
const MARKET_COORDS = {
  1: { lat: 37.536618383, lng: 126.959796815 }, // 용산용문시장
  2: { lat: 37.5338328, lng: 126.990036559 }, // 이태원시장
  3: { lat: 37.550302514133315, lng: 126.97609391600915 }, // 후암재래시장
  4: { lat: 37.551207465, lng: 126.963509378 }, // 만리시장
  5: { lat: 37.54531342552204, lng: 126.98498907716948 }, // 해방촌 신흥시장
}

const MainMapPage = () => {
  const { t, i18n } = useTranslation()
  const apiUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate()

  //상태
  const [query, setQuery] = useState('') // 검색창
  const [market, setMarket] = useState(null) // 드롭다운 선택 값
  const [markets, setMarkets] = useState([]) // 드롭다운 리스트
  const [categories, setCategories] = useState([]) // 대분류 리스트
  const [subCategories, setSubCategories] = useState([]) // 소분류 리스트
  const [randomStores, setRandomStores] = useState([]) // 랜덤 가게 리스트
  const [selectedMainId, setSelectedMainId] = useState(null) // 선택된 대분류 ID (단일 선택)
  const [selectedSubIds, setSelectedSubIds] = useState([]) // 선택된 소분류 ID (복수 선택)
  const [center, setCenter] = useState(DEFAULT_CENTER) // 지도 중심 상태
  const [level, setLevel] = useState(DEFAULT_LEVEL) // 지도 확대 정도
  const [storeMarkers, setStoreMarkers] = useState([]) // 가게 마커 배열
  const [activeStoreId, setActiveStoreId] = useState(null) // 클릭된 가게 라벨

  const [isLoading, setIsLoading] = useState(true) // 초기 로딩 + 필터링 로딩

  // 대분류 이름 받아오기
  const activeMainName = selectedMainId
    ? categories.find((c) => String(c.mainCategoryId) === String(selectedMainId))?.mainCategoryName
    : ''

  // 렌더링 시, 데이터 불러오기
  useEffect(() => {
    const lang = (i18n.language || 'en').split('-')[0]
    setIsLoading(true)
    axios
      .get(`${apiUrl}/map`, {
        headers: { 'Accept-Language': lang },
      })
      .then((response) => {
        const data = response?.data?.data
        setMarkets(data.marketOptions || [])
        setCategories(data.categoryOptions || [])
        setRandomStores(data.randomStores || [])
      })
      .catch((error) => {
        console.log(error)
        alert('데이터 불러오기에 실패했습니다.')
      })
      .finally(() => {
        setIsLoading(false) // API 요청 완료 시 로딩 상태 해제
      })
  }, [i18n.language])

  // 사용자가 특정 시장, 대분류, 소분류 선택 시
  useEffect(() => {
    const hasMarket = !!market?.value
    const hasMain = !!selectedMainId
    const hasSub = Array.isArray(selectedSubIds) && selectedSubIds.length > 0
    if (!hasMarket) {
      setStoreMarkers([])
      setActiveStoreId(null)
      return
    }
    setIsLoading(true)
    // 언어 헤더 가져오기
    const lang = (i18n.language || 'en').split('-')[0]

    // 쿼리 파라미터 가져오기 (하나라도 있으면 params에 추가)
    const params = {}
    if (hasMarket) params.market = Number(market.value)
    if (hasMain) params.main = Number(selectedMainId)
    if (hasSub) params.sub = selectedSubIds.map(Number)
    axios
      .get(`${apiUrl}/map/filter`, {
        params,
        paramsSerializer: {
          serialize: (p) => qs.stringify(p, { arrayFormat: 'repeat' }), // sub=7&sub=8
        },
        headers: { 'Accept-Language': lang },
      })
      .then((res) => {
        const result = res.data.data
        // result 배열 형태로 만들어주기
        const list = result ? (Array.isArray(result) ? result : [result]) : []

        // 결과 리스트 마커로 모두 찍기
        // 마커 객체에 가게 데이터(s) 그대로 같이 들고 다닐 수 있게 설정 (data:s)
        const nextStoreMarkers = list.map((s) => ({
          id: `store-${s.id}`,
          position: { lat: s.latitude, lng: s.longitude },
          image: { src: iconMarker, size: { width: 28, height: 28 } },
          data: {
            ...s,
            type: 'store', //마커 타입 구분
            _labelText: s.name,
          },
        }))

        setStoreMarkers(nextStoreMarkers) // 가게 마커만 업데이트
        setActiveStoreId(null) // 필터 변경 시 가게 라벨 초기화
      })
      .catch((err) => {
        console.log(err)
        setSelectedStores([])
        setStoreMarkers([]) // 시장 마커는 유지
        setActiveStoreId(null) // 라벨 초기화
      })
      .finally(() => {
        setIsLoading(false) // 필터링 완료 (성공/실패 여부와 관계없이)
      })
  }, [market?.value, selectedMainId, selectedSubIds, i18n.language])

  // 이벤트 핸들러
  // 검색창에 검색 시, 해당 가게의 마커 찍기 + ScrollArea에 보여주기
  const handleSearchSubmit = (keywordInput) => {
    const keyword = (keywordInput ?? '').trim()
    if (!keyword) return

    setIsLoading(true)

    const lang = (i18n.language || 'en').split('-')[0]

    axios
      .get(`${apiUrl}/map/search`, {
        params: { keyword },
        headers: { 'Accept-Language': lang },
      })
      .then((res) => {
        // 결과를 배열로 만들어주기
        const result = res.data.data
        const items = result ? (Array.isArray(result) ? result : [result]) : []

        if (items.length === 0) {
          setStoreMarkers([])
          if (!market?.value) {
            setRandomStores([]) // 시장 선택 전이면 랜덤 가게 띄우기
          }
          setActiveStoreId(null)
          return
        }

        const markers = items.map((s) => ({
          id: `store-${s.id}`,
          position: { lat: s.latitude, lng: s.longitude },
          image: { src: iconMarker, size: { width: 28, height: 28 } },
          data: {
            ...s,
            type: 'store',
            _labelText: s.name,
          },
        }))

        // 지도에 마커 반영
        setStoreMarkers(markers)
        setActiveStoreId(null)

        //ScrollArea에 결과 반영
        if (!market?.value) {
          setRandomStores(items)
        }

        // 결과 하나면 지도에 확대해서 보여주기
        // 결과 여러개면 fitToMarkers 알아서 작동함
        if (items.length === 1) {
          setCenter({ lat: items[0].latitude, lng: items[0].longitude })
          setLevel(3)
        }
      })
      .catch((err) => {
        console.error(err)
        alert('Failed')
        setStoreMarkers([])
        if (!market?.value) {
          setRandomStores([])
        }
        setActiveStoreId(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  // 시장 선택 시, 대/소분류 선택 초기화 & 지도 이동
  const handleChangeMarket = (opt) => {
    setMarket(opt) // opt = { label, value }
    setSelectedMainId(null) // 대분류 초기화
    setSelectedSubIds([]) // 소분류 초기화
    setSubCategories([]) // 소분류 목록 초기화
    setActiveStoreId(null) // 가게 라벨 초기화

    const mapped = MARKET_COORDS[opt.value]
    if (mapped) {
      setCenter(mapped)
      setLevel(3)
    } else {
      setCenter(DEFAULT_CENTER)
      setLevel(DEFAULT_LEVEL)
    }
  }

  // 대분류 클릭 시, 소분류 세팅
  const handleSelectMain = (mainCategoryId) => {
    setSelectedMainId(mainCategoryId)
    setSelectedSubIds([])
    const found = categories.find((c) => c.mainCategoryId === mainCategoryId)
    setSubCategories(found ? found.subCategories : [])
    setActiveStoreId(null)
  }

  // 소분류 클릭 시, 선택+해제
  const handleToggleSub = (id) => {
    setSelectedSubIds(
      (prev) =>
        prev.some((v) => String(v) === String(id))
          ? prev.filter((v) => String(v) !== String(id)) // 선택 해제
          : [...prev, id], // 선택 추가
    )
    setActiveStoreId(null)
  }

  // 가게 마커 클릭 시, 마커 보여주기
  const handleMarkerClick = (m) => {
    if (m?.data?.type !== 'store') return
    const id = m.data.id
    setActiveStoreId((prev) => (String(prev) === String(id) ? null : id))
    // 클릭한 마커로 지도 이동
    setCenter(m.position)
    setLevel(3)
  }

  // 최종 ScrollArea에 띄울 리스트 계산
  // 시장 미선택: 랜덤 가게
  // 카테고리 선택: 현재 지도에 있는 마커 띄우고, 마커 클릭하면 해당 가게 하나만 보여주기
  const allList = market?.value ? storeMarkers.map((m) => m.data) : randomStores
  const scrollList = activeStoreId
    ? allList.filter((s) => String(s.id) === String(activeStoreId))
    : allList

  return (
    <>
      {/* 헤더 */}
      <Header title={t('bottomNav.map')} showImg={false} />
      <S.MapContainer>
        {!isLoading && (
          <KakaoMap
            center={center}
            level={level}
            markers={storeMarkers}
            onMarkerClick={handleMarkerClick} // 마커 클릭 시, 해당 가게 정보 받기
            onMapClick={() => setActiveStoreId(null)} // 빈 공간 클릭시 선택 해제
            showMarkerLabels
            getLabel={(m) => {
              // 라벨 노출 기준
              if (m?.data?.type === 'store' && m?.data?.id === activeStoreId)
                return m?.data?._labelText ?? ''
              return '' // 그 외는 라벨 없음
            }}
            labelYAnchor={2.3}
            fitToMarkers // 마커 전체가 보이도록 맞춤
            fitSingleLevel={2} // 마커 한 개일 때 레벨 고정
            fitBoundsPaddingRatio={0.04} // 여백(4%)
          />
        )}
        {/* 스크롤 영역 -> 아무것도 선택 안되면 랜덤 가게, 선택되면 선택된 가게 정보*/}
        <ScrollArea
          key={`m:${market?.value || 0}-main:${selectedMainId || 0}-subs:${(Array.isArray(
            selectedSubIds,
          )
            ? [...selectedSubIds].sort((a, b) => String(a).localeCompare(String(b)))
            : []
          ).join('_')}`}
          title={t('dropdown.stores')}
          randomStores={scrollList}
          categories={categories}
          selectedMainId={null}
          selectedSubIds={[]}
          onStoreClick={(id) => {
            const matched = storeMarkers.find((m) => String(m?.data?.id) === String(id))
            if (matched) {
              setActiveStoreId(matched.data.id)
              setCenter(matched.position)
              setLevel(3)
            }
          }}
          isLoading={isLoading}
        />

        {/* 카카오맵 */}
        {/*지도 위 오버레이 영역 */}
        <S.Overlay>
          {/* 검색창 */}
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={t('button.search')}
            onSubmit={handleSearchSubmit}
          />
          {/* 시장 선택 안하면 DropDown 보여주고, 선택하면 그 자리에 MarketCategoryRow 보여주기 */}
          {!market ? (
            <DropDown
              value={market}
              onChange={handleChangeMarket}
              placeholder={t('dropdown.select')}
              options={markets.map((m) => ({ label: m.name, value: m.id }))}
            />
          ) : (
            <MarketCategoryRow
              marketLabel={market.label}
              mainLabel={activeMainName}
              onClearMarket={() => {
                // 시장 초기화
                setMarket(null)
                setSelectedMainId(null)
                setSelectedSubIds([])
                setSubCategories([])
                setStoreMarkers([])
                setCenter(DEFAULT_CENTER)
                setLevel(DEFAULT_LEVEL)
                setActiveStoreId(null)
              }}
              onClearMain={() => {
                // 대분류 초기화 (시장은 유지)
                setSelectedMainId(null)
                setSelectedSubIds([])
                setSubCategories([])
                setActiveStoreId(null)
              }}
            />
          )}

          {/* 대분류 선택되면 소분류 보여주고, 시장만 선택된 상태면 대분류 보여주기 */}
          {selectedMainId ? (
            <SubCategories
              subCategories={subCategories}
              selectedSubIds={selectedSubIds}
              onToggleSub={handleToggleSub}
            />
          ) : (
            market && (
              <MainCategories
                market={market}
                categories={categories}
                selectedMainId={selectedMainId}
                onSelectMain={handleSelectMain}
              />
            )
          )}
        </S.Overlay>
      </S.MapContainer>
      {/* 하단바 */}
      <CustomerBottomNav />
      {isLoading && (
        <S.LoadingOverlay>
          <Loading />
        </S.LoadingOverlay>
      )}
    </>
  )
}

export default MainMapPage
