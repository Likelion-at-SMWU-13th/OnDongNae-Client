import styled from 'styled-components'

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
