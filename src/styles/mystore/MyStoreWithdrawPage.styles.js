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
export const Container = styled.div`
  margin: 40px 33px 0 33px;
`
export const Text = styled.p`
  color: #000;
  font-size: 20px;
  font-weight: 400;
`

export const BoxContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`
export const Button = styled.button`
  border-radius: 10px;
  background: #f08e67;
  color: rgba(255, 255, 255, 1);
  border: none;
  display: flex;
  padding: 13.5px 32px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  margin: 40px auto 52px auto;
`
