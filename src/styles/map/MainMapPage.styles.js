import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
`

/* 오버레이 기준점*/
export const MapContainer = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
`

export const Overlay = styled.div`
  width: 100%;
  position: absolute;
  top: 15px; /* 상단 여백 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10; /* 지도보다 위, ScrollArea보다 아래 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent; /* 흰 배경 제거 */

  pointer-events: none;
  > * {
    pointer-events: auto;
  }
`
