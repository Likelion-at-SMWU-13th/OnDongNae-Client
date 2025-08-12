import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 44px 0 30px;
  gap: 60px;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 77.43%;
  gap: 12.3%;
  margin: 0 auto;
`
export const Main = styled.main`
  height: calc(var(--vh, 1vh) * 100); /* 화면 높이 채우기 */
  display: flex;
  flex-direction: column;
  min-height: 0;
`

export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간을 차지 */
  min-height: 0; /* 내부에 overflow가 먹히게 하는 핵심 */
  /* overflow-y는 전역 .scrollable에서 적용됨 */
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 80px);
`
