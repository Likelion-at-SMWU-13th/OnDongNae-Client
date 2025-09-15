import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 8dvh;
`
export const Img = styled.img`
  width: 11.5dvh;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`
export const TextContainer = styled.div`
  margin-top: 5dvh;
`

export const Title = styled.p`
  color: #000;
  text-align: center;
  font-feature-settings: 'dlig' on;
  font-size: 2.3125rem;
  font-weight: 600;
`
export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.5dvh;
`

export const Navigation = styled.button`
  display: flex;
  flex-direction: row;
  gap: 5px;
  background: white;
  border: none;
  cursor: pointer;
  margin-bottom: 8dvh;
  margin-top: 2dvh;
`
export const Icon = styled.img`
  width: 3dvh;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`
export const Text = styled.p`
  color: #000;
  text-align: center;
  font-feature-settings: 'dlig' on;
  font-size: 1.125rem;
  font-weight: 400;
`

export const ContinueButton = styled.button`
  width: 50%;
  height: 41px;
  border-radius: 50px;
  background: #f08e67;

  color: #fff;
  text-align: center;
  font-feature-settings: 'dlig' on;
  font-size: 1.5625rem;
  font-weight: 400;
  border: none;
  cursor: pointer;
`
export const Container = styled.main`
  height: calc(var(--dvh, 1dvh) * 100); /* 화면 높이 채우기 */
  display: flex;
  flex-direction: column;
  min-height: 0;
  margin-top: 6.28dvh;
`

export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간을 차지 */
  min-height: 0; /* 내부에 overflow가 먹히게 하는 핵심 */
  /* overflow-y는 전역 .scrollable에서 적용됨 */
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0));
`
