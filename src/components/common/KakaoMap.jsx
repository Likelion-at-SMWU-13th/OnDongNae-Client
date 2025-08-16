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
 * }} KakaoMapProps
 */

import { useRef } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

/** @param {KakaoMapProps} props */
export default function KakaoMap({
  // [뷰 설정]
  center = { lat: 37.5326, lng: 126.9905 }, // 기본 중심 좌표 (용산구)
  level = 6, // 확대 레벨 (낮을수록 확대)
  style = {
    width: '100%',
    height: 'calc(100dvh - 155px)',
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
  // window.kakao 접근 시 빌드 환경에 따라 undefined일 수 있어 안전하게 옵셔널 체이닝
  zoomControlPosition = window.kakao?.maps.ControlPosition?.RIGHT,
}) {
  // 카카오 지도 인스턴스를 저장(필요 시 직접 API 호출: setCenter, setLevel 등)
  const mapRef = useRef(null)

  return (
    <Map
      center={center}
      level={level}
      style={style}
      onCreate={(map) => (mapRef.current = map)} // 생성 시 map 인스턴스 확보
      onClick={onMapClick} // 지도 빈 곳 클릭 이벤트
      onIdle={() => onIdle?.(mapRef.current)} // 이동/확대 종료 콜백
      draggable={draggable}
      scrollwheel={scrollwheel}
      zoomable={true}
    >
      {markers.map((m) => (
        <MapMarker
          key={m.id ?? `${m.position.lat}-${m.position.lng}`}
          position={m.position}
          image={m.image} // { src, size:{width,height}, options? }
          onClick={() => onMarkerClick?.(m)}
        />
      ))}
    </Map>
  )
}
//   return (
//     // 용산구 중심으로 보여주기
//     <Map
//       center={{ lat: 37.5326, lng: 126.9905 }}
//       level={6}
//       style={{
//         width: '100%',
//         height: 'calc(100dvh - 155px)',
//         display: 'flex',
//         flexDirection: 'column',
//         minHeight: 0,
//       }}
//     ></Map>
//   )
// }

// export default KakaoMap
