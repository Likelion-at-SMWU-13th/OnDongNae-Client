import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 9vh;
`
export const Img = styled.img`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`
export const TextContainer = styled.div`
  margin-top: 3.1vh;
`

export const Title = styled.p`
  color: #000;
  text-align: center;
  font-feature-settings: 'dlig' on;
  font-size: 20px;
  font-weight: 400;
`
export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
`

export const Navigation = styled.button`
  display: flex;
  flex-direction: row;
  gap: 5px;
  background: white;
  border: none;
  cursor: pointer;
  margin-bottom: 9.7vh;
`
export const Icon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`
export const Text = styled.p`
  color: #000;
  text-align: center;
  font-feature-settings: 'dlig' on;
  font-size: 18px;
  font-weight: 300;
`

export const ContinueButton = styled.button`
  width: 80%;
  height: 41px;
  border-radius: 10px;
  background: #f08e67;

  color: #fff;
  text-align: center;
  font-feature-settings: 'dlig' on;
  font-size: 25px;
  font-weight: 400;
  border: none;
  cursor: pointer;
`
export const Container = styled.main`
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
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 60px);
`
