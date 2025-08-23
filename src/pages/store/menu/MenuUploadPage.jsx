// src/pages/menu/MenuUploadPage.jsx
import React, { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import authAxios from '@/lib/authAxios'
import Header from '@/components/common/Header'
import DoubleTitle from '@/components/common/DoubleTitle'
import closeIcon from '@/assets/button-close.svg'
import BtnUpload from '@/assets/icon-upload-photo.svg'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'
import BottomNav from '@/components/common/BottomNav'

export default function MenuUploadPage() {
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const apiUrl = import.meta.env.VITE_API_URL
  const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''

  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  // 파일 선택 트리거
  const openPicker = () => fileRef.current?.click()

  // 파일 변경 핸들러
  const onChangeFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있어요.')
      e.target.value = ''
      return
    }
    // 미리보기 URL 생성
    const url = URL.createObjectURL(f)
    setFile(f)
    setPreviewUrl(url)
  }

  // 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  // 이미지 제거
  const removeImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setFile(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  // 연동
  const handleSubmit = (e) => {
    console.log('[MenuUpload] submit clicked, file=', file)
    const formData = new FormData()
    formData.append('image', file)
    authAxios
      .post(`${apiUrl}/me/menus/ocr/extract`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const MenuData = res.data
        navigate('/menu/extract/loading', { state: { MenuData } })
      })
      .catch((err) => {
        console.log(err)
        navigate('/menu/extract/fail')
      })
  }
  return (
    <div>
      <Header title={'메뉴 관리'} showImg={true} />
      <DoubleTitle
        title='메뉴판 사진을 올려주세요'
        subtitle='가게의 메뉴판이 잘 보이는 사진을 올려주세요'
      />

      {/* 파일 입력은 숨기고 아이콘 클릭으로 열기 */}
      <input
        ref={fileRef}
        type='file'
        accept='image/*'
        onChange={onChangeFile}
        style={{ display: 'none' }}
      />

      {/* 업로드 전: 업로드 버튼만 노출 */}
      {!previewUrl && (
        <ImgContainer>
          <Img
            src={BtnUpload}
            alt='사진 업로드'
            onClick={openPicker}
            style={{ cursor: 'pointer' }}
          />
        </ImgContainer>
      )}

      {/* 업로드 후: 미리보기 + 삭제 버튼 */}
      {previewUrl && (
        <>
          <ImageContainer>
            <MenuImage src={previewUrl} alt='메뉴판 사진' />
            <CloseBtn onClick={removeImage}>
              <img src={closeIcon} alt='이미지 삭제' />
            </CloseBtn>
          </ImageContainer>

          {/* 하단 버튼(저장/다음 등) - 이미지가 있을 때만 */}
          <SmallButtonContainer handleSubmit={handleSubmit} />
        </>
      )}

      <BottomNav />
    </div>
  )
}

const Img = styled.img`
  margin-top: 90px;
`

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`

const ImageContainer = styled.div`
  position: relative;
  margin: 50px auto;
  width: 296px;
  height: 204px;
  background: #f2f2f2;
  overflow: hidden;
`

const MenuImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 25px;
  width: 28px;
  height: 28px;
  border: 0;
  background: transparent;
`
