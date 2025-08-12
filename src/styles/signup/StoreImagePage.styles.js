// 사진 업로드 페이지 전용 스타일 컴포넌트
// - 시안 기준 최대 가로폭 420px 내에서 중앙 정렬
// - 2열 그리드, 정사각형 타일(1:1)
// - 삭제(X) 버튼은 우상단 원형

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 109px;
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 44px 0 30px;
  gap: 15px;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  gap: 41px;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
  margin-left: 14px;
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

/* ✅ 빈 칸 채워서 2×2 유지하는 스페이서(투명) */
export const Spacer = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  background: transparent;
`
