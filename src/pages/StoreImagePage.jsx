import styled from 'styled-components'
import * as S from '@/styles/signup/StoreImagePage.styles'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import SubTitle from '@/components/signup/SubTitle'
import SmallButtonContainerSkip from '@/components/common/SmallButtonContainerSkip'
import addImg from '@/assets/button-add-picture.svg'
import deleteImg from '@/assets/button-delete-picture.svg'

const StoreImagePage = () => {
  const navigate = useNavigate()
  // 이전 스텝에서 넘어온 상태를 이어받고 싶을 때 사용 (없어도 동작)
  const { state } = useLocation()

  // 숨겨진 <input type="file">에 접근하기 위한 ref
  const fileInputRef = useRef(null)

  // 업로드 이미지 상태
  // - id: 리스트 키 및 삭제 식별자
  // - file: 원본 File 객체 (서버 업로드 시 사용)
  // - url: 미리보기용 Object URL (img src로 사용)
  const [photos, setPhotos] = useState([])

  // 파일 선택창 열기 (버튼/타일 클릭 → 숨겨진 input click)
  const openPicker = () => fileInputRef.current?.click()

  // 파일 선택 시 함수
  const onFilesSelected = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    // 남은 슬롯(4 - 현재 수)만큼만 받기 (디자인: 최대 4장)
    const remain = 4 - photos.length
    const picked = files.slice(0, remain)

    // 선택 파일들에 대한 미리보기 URL을 만든다
    const appended = picked.map((file, i) => ({
      id: Date.now() + i, // 간단한 고유 id (충돌 가능성 낮음)
      file,
      url: URL.createObjectURL(file), // 브라우저 로컬 미리보기
    }))

    // 기존 + 신규 병합
    setPhotos((prev) => [...prev, ...appended])

    // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
    e.target.value = ''
  }

  // 사진 제거 함수
  const removePhoto = (id) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id)
      // Object URL은 수동으로 revoke하여 메모리 누수 방지
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((p) => p.id !== id)
    })
  }

  // 컴포넌트 unmount 시 Object URL 정리 (안전장치)
  useEffect(() => {
    return () => {
      photos.forEach((p) => {
        try {
          URL.revokeObjectURL(p.url)
        } catch {}
      })
    }
  }, [])

  // "건너뛰기" 클릭: 사진 없이 다음 단계로 이동
  const handleSkip = () => {
    navigate('/signup/store-keyword1', { state: { ...state, photos: [] } })
  }

  // "다음" 클릭
  const handleSubmit = (e) => {
    e.preventDefault()

    // 페이지 이동
    navigate('/signup/store-keyword1', { state: { ...state, photos } })
  }

  return (
    <>
      {/* 상단 헤더*/}
      <Header img={backIcon} title={'회원가입'} showImg={false} />
      {/* 스크롤 가능 영역*/}
      <S.Main>
        <S.Scroll className='scrollable'>
          <ProgressBar currentStep={5} totalSteps={6} logoImg={smallDragon} />

          <S.Container>
            <S.TextContainer>
              {/* 큰 제목 */}
              <Title text={'가게의 대표 사진을 올려주세요.'} />
              {/* 작은 제목 */}
              <SubTitle text={'사진은 최대 4장까지 올릴 수 있어요. \n 건너뛰기 해도 괜찮아요.'} />
            </S.TextContainer>
            {/* 하단 버튼 영역: form submit으로 묶어 엔터/IME 제출 대응 */}

            {/* 사진 영역 */}
            <S.ImgContainer>
              {photos.length === 0 ? (
                // 사진이 하나도 없으면
                <S.AddImage
                  src={addImg}
                  alt='사진 추가'
                  onClick={openPicker} // 파일 픽커 띄우기
                  role='button' //스크린리더에 버튼처럼 읽히게
                />
              ) : (
                // 사진 있으면
                <S.Grid>
                  {/* 썸네일: 업로드한 파일 썸네일 보여주기 */}
                  {photos.map((p) => (
                    <S.Thumb key={p.id}>
                      <img src={p.url} alt='썸네일' />
                      <S.RemoveBtn onClick={() => removePhoto(p.id)}>
                        <S.RemoveIcon src={deleteImg} alt='삭제' />{' '}
                      </S.RemoveBtn>
                    </S.Thumb>
                  ))}

                  {/* 오렌지 배경: 갤러리에서 사진 선택 */}
                  {photos.length < 4 && (
                    <S.AddTile type='button' onClick={openPicker}>
                      갤러리에서
                      <br />
                      사진 선택
                    </S.AddTile>
                  )}

                  {/* 투명 배경: 2*2 자리 맞추기 위함 */}
                  {Array.from({
                    length: Math.max(0, 4 - (photos.length + (photos.length < 4 ? 1 : 0))),
                  }).map((_, i) => (
                    <S.Spacer key={`sp-${i}`} aria-hidden />
                  ))}
                </S.Grid>
              )}
            </S.ImgContainer>

            {/* 숨겨진 파일 입력창 (실제로는 이걸 클릭해서 업로드) */}
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              multiple
              onChange={onFilesSelected}
              style={{ display: 'none' }}
            />

            <SmallButtonContainerSkip handleSubmit={handleSubmit}></SmallButtonContainerSkip>
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}

export default StoreImagePage
