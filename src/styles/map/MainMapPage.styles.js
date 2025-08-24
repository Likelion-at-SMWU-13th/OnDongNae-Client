import styled from 'styled-components'

/* 오버레이 기준점*/
export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100dvh - 19dvh);
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

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20; // 다른 UI 요소들보다 위에 있도록 설정
`
