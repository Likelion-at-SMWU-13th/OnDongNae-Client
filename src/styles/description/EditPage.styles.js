import styled from 'styled-components'

export const Main = styled.main`
  height: calc(100dvh - 161px);
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
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 69px 38px 40px 30px;
`

export const TextArea = styled.textarea`
  height: 262px;
  padding: 47px 17px;
  border-radius: 10px;
  border: 2px solid #f08e67;
  background: #fff;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.1);
  color: #000;
  font-feature-settings: 'dlig' on;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 116.667% */
  white-space: pre-line;
  resize: none;
`
