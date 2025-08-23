import React from 'react'
import styled from 'styled-components'
import KakaoMapContainer from '@/components/common/KakaoMapContainer'
import iconMarker from '@/assets/icon-big-mapMarker.svg'

function MapSection({ header }) {
  // header가 없거나 lat/lng가 비어있으면 용산구 중심 좌표로 기본값 처리 + 마커는 보여주지 말기
  const lat = header?.lat ?? 37.5326
  const lng = header?.lng ?? 126.9905

  const hasCoords = header?.lat != null && header?.lng != null

  // 마커 배열
  const markers = hasCoords
    ? [
        {
          id: 'main-marker',
          position: { lat, lng },
          image: { src: iconMarker, size: { width: 28, height: 28 } },
        },
      ]
    : []

  return (
    <Wrap>
      <MapBox>
        <KakaoMapContainer
          center={{ lat, lng }}
          level={2}
          style={{
            width: '100%',
            height: '100%',
          }}
          markers={markers}
        />
      </MapBox>
    </Wrap>
  )
}

export default MapSection

const Wrap = styled.section`
  padding: 0 25px 20px 25px;
`

// 박스 안에 카카오맵을 채워 넣기
const MapBox = styled.div`
  width: 100%;
  height: 122px;
  border-radius: 10px;
  overflow: hidden;
`
