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
export const FieldContainer = styled.div`
  margin: 40px 33px 0 33px;
  display: flex;
  flex-direction: column;
  gap: 49px;
`

export const ButtonContainer = styled.div`
  margin: 61px 0 40px 0;
`
