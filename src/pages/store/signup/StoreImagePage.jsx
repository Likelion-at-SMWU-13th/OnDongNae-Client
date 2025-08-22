import styled from 'styled-components'
import * as S from '@/styles/signup/StoreImagePage.styles'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import SubTitle from '@/components/signup/SubTitle'
import SmallButtonContainerSkip from '@/components/common/SmallButtonContainerSkip'
import addImg from '@/assets/button-add-picture.svg'
import deleteImg from '@/assets/button-delete-picture.svg'

const SESSION_KEY = 'image' // 세션 저장 키

const StoreImagePage = () => {
  const navigate = useNavigate()

  const fileInputRef = useRef(null)

  // photos: [{ id, url }]
  const [photos, setPhotos] = useState([])

  // 파일 선택창 열기
  const openPicker = () => fileInputRef.current?.click()

  // File -> Data URL 변환
  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const r = new FileReader()
      r.onload = () => resolve(r.result)
      r.onerror = reject
      r.readAsDataURL(file)
    })

  // 파일 선택 시
  const onFilesSelected = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const remain = 4 - photos.length
    const picked = files.slice(0, remain)

    // Data URL로 변환
    const urls = await Promise.all(picked.map(fileToDataUrl))
    const appended = urls.map((dataUrl, i) => ({
      id: Date.now() + i,
      url: dataUrl,
    }))

    const next = [...photos, ...appended].slice(0, 4)
    setPhotos(next)
    // 세션스토리지에 추가
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next.map((p) => p.url)))

    // 같은 파일 다시 선택 가능하도록 초기화
    e.target.value = ''
  }

  // 사진 삭제
  const removePhoto = (id) => {
    const next = photos.filter((p) => p.id !== id)
    setPhotos(next)
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next.map((p) => p.url)))
  }

  const handleSubmit = (action) => {
    if (action === 'skip') {
      // 건너뛰기 시 비우기
      sessionStorage.setItem(SESSION_KEY, JSON.stringify([]))
      navigate('/signup/store-keyword1')
      return
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(photos.map((p) => p.url)))
    navigate('/signup/store-keyword1')
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
