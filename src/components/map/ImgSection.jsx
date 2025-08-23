import React, { useState } from 'react'
import styled from 'styled-components'

function ImgSection({ imgs = [] }) {
  const num = 4 // 그리드 4칸
  const filled = imgs.slice(0, num)
  const [selectedImg, setSelectedImg] = useState(null) // 이미지 선택하면 확대
  const [failed, setFailed] = useState(Array(num).fill(false)) // 이미지 로딩 실패 여부 받기
  while (filled.length < num) filled.push(null)

  // 모달 열기
  const openModal = (src) => {
    if (src) {
      setSelectedImg(src)
    }
  }

  // 모달 닫기
  const closeModal = () => {
    setSelectedImg(null)
  }

  const markFailed = (i) =>
    setFailed((prev) => {
      if (prev[i]) return prev
      const next = [...prev]
      next[i] = true
      return next
    })

  const checkImg = (i, style) => {
    const src = filled[i]
    if (!src || failed[i]) return <BlankImg style={style} />
    return (
      <Img
        src={src}
        alt={`img${i + 1}`}
        onError={() => markFailed(i)}
        style={style}
        onClick={() => openModal(src)}
      />
    ) // 로드 실패 시 회색 박스로 교체
  }

  return (
    <ImgContainer>
      <Grid>
        {/* 함수로 이미지 처리 */}
        {checkImg(0, { gridColumn: '1 / 2', gridRow: '1 / span 2' })}
        {checkImg(1, { gridColumn: '2 / 4', gridRow: '1 / 2' })}
        {checkImg(2, { gridColumn: '2 / 3', gridRow: '2 / 3' })}
        {checkImg(3, { gridColumn: '3 / 4', gridRow: '2 / 3' })}
      </Grid>
      {selectedImg && (
        <ModalWrapper onClick={closeModal}>
          <ModalContent>
            <BigImg src={selectedImg} alt='' />
          </ModalContent>
        </ModalWrapper>
      )}
    </ImgContainer>
  )
}

export default ImgSection

const ImgContainer = styled.div`
  width: 100%;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: repeat(2, 88px);
  gap: 6px; // 이미지 간 간격
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

// 이미지 없거나 로딩 실패시
const BlankImg = styled.div`
  width: 100%;
  height: 100%;
  background: #f1f1f1;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

// 확대된 이미지를 감싸는 컨테이너
const ModalContent = styled.div`
  max-width: 90vw;
  max-height: 90vh;
`

// 확대된 이미지
const BigImg = styled.img`
  width: 90dvw;
  height: 90dvh;
  object-fit: contain;
`
