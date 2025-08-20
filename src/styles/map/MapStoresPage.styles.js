import styled from 'styled-components'

export const Main = styled.main`
  height: calc(100dvh - 155px);
  display: flex;
  flex-direction: column;
  min-height: 0;
`

export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0));
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
