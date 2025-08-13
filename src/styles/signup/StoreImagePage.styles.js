import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 44px 32px 30px;
  gap: 15px;
`

// 같은 파일의 styled-components에 추가
export const ImgContainer = styled.div`
  /* 타일, 갭, 행 수를 변수화 */
  --tile: 120px;
  --gap: 20px;
  --rows: 2;

  /* 2행 그리드가 차지하는 고정 높이 */
  height: calc(var(--rows) * var(--tile) + (var(--rows) - 1) * var(--gap));
  /* 가로 가운데 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 41px;
`

// 아무 이미지도 없을 때 이미지 추가
export const AddImage = styled.img`
  display: block;
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  margin: 0 auto;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none; // 사파리에서 드래그 미리보기 방지
`

// 그리드 설정
export const Grid = styled.div`
  /* ✅ 2열 고정 + 셀 크기 120×120로 고정 */
  display: grid;
  grid-template-columns: repeat(2, 120px);
  grid-auto-rows: 120px;
  gap: 20px;
  justify-content: center; /* 가운데 정렬(화면 폭 넓을 때) */
`

// 썸네일
export const Thumb = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
  background: #e5e5e5;
  border-radius: 12px;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const RemoveBtn = styled.button`
  position: absolute;
  right: 0px;
  // 삭제 버튼 크기
  width: 48px;
  height: 48px;
  padding: 0;
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;
`

export const RemoveIcon = styled.img``

// 사진 추가 타일
export const AddTile = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 10px;
  background: #feb99d;
  color: #fff;

  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`

/* 빈 칸 채워서 2×2 유지하는 스페이서(투명) */
export const Spacer = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  background: transparent;
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
