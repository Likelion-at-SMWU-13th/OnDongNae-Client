// src/components/PageContainer.js
import styled from 'styled-components'

const PageContainer = styled.div`
  width: 390px;
  height: calc(var(--vh, 1vh) * 100); /* 모바일 주소창 높이 변화 대응 */
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
  max-width: 100%; /* 작은 화면 대응 */
`

export default PageContainer
