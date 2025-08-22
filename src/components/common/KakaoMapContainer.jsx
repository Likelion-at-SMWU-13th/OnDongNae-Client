/**
 * @typedef {{lat: number, lng: number}} LatLng
 * @typedef {{
 *   center?: LatLng,
 *   level?: number,
 *   style?: React.CSSProperties,
 *   markers?: Array<{ id?: string|number, position: LatLng, image?: any, data?: any }>,
 *   onMarkerClick?: (marker:any)=>void,
 *   onMapClick?: (e:any)=>void,
 *   onIdle?: (map:any)=>void,
 *   draggable?: boolean,
 *   scrollwheel?: boolean,
 *   zoomControlPosition?: any
 *   showMarkerLabels?: boolean,
 *   getLabel?: (marker:any)=>React.ReactNode,
 *   labelXAnchor?: number,
 *   labelYAnchor?: number,
 * fitToMarkers?: boolean,
 *   fitSingleLevel?: number,
 * fitBoundsPaddingRatio?: number
 * }} KakaoMapProps
 */

import { useRef, Fragment, useEffect } from 'react'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import styled from 'styled-components'

/** @param {KakaoMapProps} props */
export default function KakaoMap({
  // [뷰 설정]
  center = { lat: 37.5326, lng: 126.9905 }, // 기본 중심 좌표 (용산구)
  level = 6, // 확대 레벨 (낮을수록 확대)
  style = {
    width: '100%',
    height: 'calc(100dvh - 19dvh)',
    display: 'flex',
    minHeight: '0',
  }, // 지도의 크기 (height 꼭 지정 권장)

  // [마커]
  markers = [], // [{ id?, position:{lat,lng}, image?, data? }]
  onMarkerClick, // (marker) => void  | 마커 클릭 시 상위로 이벤트 전달

  // [지도 이벤트]
  onMapClick, // (mouseEvent) => void | 지도 빈 곳 클릭
  onIdle, // (mapInstance) => void | 지도 이동/확대 종료 후

  // [지도 옵션]
  draggable = true, // 드래그 가능
  scrollwheel = true, // 마우스 휠로 줌 가능

  // [라벨 옵션 - 신규]
  showMarkerLabels = false,
  getLabel, // (m) => ReactNode (예: (m)=>t(m.title))
  labelYAnchor = 1.3, // 마커 위로 살짝 띄우기
  labelXAnchor = 0.5,
  fitToMarkers = false,
  fitSingleLevel = 3,
  fitBoundsPaddingRatio = 0.1,
}) {
  // 카카오 지도 인스턴스를 저장(필요 시 직접 API 호출: setCenter, setLevel 등)
  const mapRef = useRef(null)
  useEffect(() => {
    if (!fitToMarkers) return
    const map = mapRef.current
    const kakao = typeof window !== 'undefined' ? window.kakao : null
    if (!map || !kakao || !kakao.maps || !Array.isArray(markers) || markers.length === 0) return

    // 마커 1개: 중심 이동 + 지정 레벨
    if (markers.length === 1) {
      const p = markers[0].position
      map.setCenter(new kakao.maps.LatLng(p.lat, p.lng))
      if (typeof fitSingleLevel === 'number') {
        map.setLevel(fitSingleLevel)
      }
      return
    }

    // 마커 여러 개: bounds 계산
    const bounds = new kakao.maps.LatLngBounds()
    markers.forEach((m) => bounds.extend(new kakao.maps.LatLng(m.position.lat, m.position.lng)))

    // 여백(비율) 적용
    if (fitBoundsPaddingRatio > 0) {
      const sw = bounds.getSouthWest()
      const ne = bounds.getNorthEast()
      const latSpan = ne.getLat() - sw.getLat()
      const lngSpan = ne.getLng() - sw.getLng()
      const latPad = latSpan * fitBoundsPaddingRatio
      const lngPad = lngSpan * fitBoundsPaddingRatio
      const paddedSW = new kakao.maps.LatLng(sw.getLat() - latPad, sw.getLng() - lngPad)
      const paddedNE = new kakao.maps.LatLng(ne.getLat() + latPad, ne.getLng() + lngPad)
      const padded = new kakao.maps.LatLngBounds(paddedSW, paddedNE)
      map.setBounds(padded)
    } else {
      map.setBounds(bounds)
    }
  }, [markers, fitToMarkers, fitSingleLevel, fitBoundsPaddingRatio])

  return (
    <Map
      center={center}
      level={level}
      style={style}
      onCreate={(map) => (mapRef.current = map)} // 생성 시 map 인스턴스 확보
      onClick={onMapClick} // 지도 빈 곳 클릭 이벤트
      onIdle={() => onIdle?.(mapRef.current)} // 이동/확대 종료 콜백
      draggable={true}
      scrollwheel={true}
      zoomable={true}
    >
      {markers.map((m) => {
        const raw = getLabel?.(m)
        const hasLabel =
          raw !== null &&
          raw !== undefined &&
          raw !== false &&
          (typeof raw !== 'string' || raw.trim().length > 0)

        return (
          <Fragment key={m.id ?? `${m.position.lat}-${m.position.lng}`}>
            <MapMarker
              key={m.id ?? `${m.position.lat}-${m.position.lng}`}
              position={m.position}
              image={m.image}
              onClick={() => onMarkerClick?.(m)}
            />
            {showMarkerLabels && getLabel && hasLabel && (
              <CustomOverlayMap position={m.position} xAnchor={labelXAnchor} yAnchor={labelYAnchor}>
                <Label>{raw}</Label>
              </CustomOverlayMap>
            )}
          </Fragment>
        )
      })}
    </Map>
  )
}

const Label = styled.div`
  padding: 6px 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #fb8750;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: #1a0f0f;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  transform: translateY(-4px);
  pointer-events: none;

  &:empty {
    display: none;
  }
`
