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
export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 30px 30px 30px;
`
export const Arrow = styled.div`
  height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform: translateY(8px);

  pointer-events: none;

  img {
    width: 40px;
    height: 40px;
  }
`
