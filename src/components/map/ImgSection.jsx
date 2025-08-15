import React, { useState } from 'react'
import styled from 'styled-components'

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
  background: #d9d9d9;
`

function ImgSection({ imgs = [] }) {
  const num = 4 // 그리드 4칸
  const filled = imgs.slice(0, num)
  while (filled.length < num) filled.push(null)

  // 이미지 로딩 실패 여부 받기
  const [failed, setFailed] = useState(Array(num).fill(false))

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
    return <Img src={src} alt={`img${i + 1}`} onError={() => markFailed(i)} style={style} /> // 로드 실패 시 회색 박스로 교체
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
    </ImgContainer>
  )
}

export default ImgSection
