import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import spinnerIcon from '@/assets/icon-spinner.svg'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
`

const Img = styled.img`
  width: 119px;
  height: 119px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`

const Text = styled.p`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
`
/* Data URL( base64 ) -> File 동기 변환 유틸  */
function dataUrlToFile(dataUrl, filename = 'image.jpg') {
  const [header, data] = dataUrl.split(',')
  // mime 추출
  const mimeMatch = header.match(/data:(.*?)(;|$)/)
  const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream'

  // base64 여부 확인
  const isBase64 = /;base64/i.test(header)
  let u8arr

  if (isBase64) {
    const bstr = atob(data) // base64 디코딩
    u8arr = new Uint8Array(bstr.length)
    for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i)
  } else {
    // URL-encoded 데이터인 경우
    const decoded = decodeURIComponent(data)
    u8arr = new TextEncoder().encode(decoded)
  }

  return new File([u8arr], filename, { type: mime })
}

const SignupLoadingPage = () => {
  const navigate = useNavigate()
  const sentRef = useRef(false)

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (sentRef.current) return // 이미 보냈으면 재전송 막기
    sentRef.current = true

    // 세션에서 값 가져오기
    const userId = sessionStorage.getItem('memberId')
    const marketName = sessionStorage.getItem('marketName')
    const storeName = sessionStorage.getItem('storeName')
    const address = sessionStorage.getItem('address') || ''
    const phoneNum = sessionStorage.getItem('phoneNum') || ''
    const mainCategory = sessionStorage.getItem('mainCategory')
    const subCategory = sessionStorage.getItem('subCategory')
    const strength = sessionStorage.getItem('strength') || ''
    const recommendation = sessionStorage.getItem('recommendation') || ''
    const imageDataUrls = JSON.parse(sessionStorage.getItem('image') || '[]')

    // subCategory 파싱
    let subIds = []
    if (subCategory) {
      try {
        const parsed = JSON.parse(subCategory)
        if (Array.isArray(parsed)) subIds = parsed.map(String)
        else if (typeof parsed === 'number') subIds = [String(parsed)]
        else if (typeof parsed === 'string' && parsed.trim()) subIds = [parsed.trim()]
      } catch {
        subIds = subCategory
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      }
    }

    // 필수값 검증
    const needSub = mainCategory !== '6'
    if (!userId || !storeName || !marketName || !mainCategory || (needSub && subIds.length === 0)) {
      alert('필수값을 입력하지 않았습니다. 다시 회원가입을 진행해주세요.')
      navigate('/signup/userinfo')
      return
    }

    // FormData 구성
    const form = new FormData()
    form.append('userId', userId)
    form.append('storeName', storeName)
    form.append('marketName', marketName)
    form.append('mainCategory', mainCategory)
    // 소분류는 개별 키로 여러 번 추가
    subIds.forEach((id) => form.append('subCategory', id))

    if (address) form.append('address', address)
    if (phoneNum) form.append('phoneNum', phoneNum)
    if (strength) form.append('strength', strength)
    if (recommendation) form.append('recommendation', recommendation)

    // 이미지 Data URL 배열에서 File 배열로 변환 후 append
    if (Array.isArray(imageDataUrls) && imageDataUrls.length > 0) {
      const files = imageDataUrls.map((u, i) => dataUrlToFile(u, `image_${i + 1}.jpg`))
      files.forEach((file) => form.append('image', file, file.name))
    }

    // axios로 전송
    axios
      .post(`${apiUrl}/auth/signup/store`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        navigate('/signup/complete', { replace: true })
      })
      .catch((err) => {
        console.error('status:', err.response?.status)
        console.error('data:', err.response?.data)
        console.error('headers:', err.response?.headers)
        console.error('message:', err.message)
        alert('회원가입을 다시 진행해주세요.')
        navigate('/signup/userinfo')
      })
  }, [])

  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={true} />
      <Container>
        <Img src={spinnerIcon} alt='로딩중' />
        <Text>
          회원가입 진행 중… <br />
          잠시만 기다려 주세요!
        </Text>
      </Container>
    </>
  )
}

export default SignupLoadingPage
