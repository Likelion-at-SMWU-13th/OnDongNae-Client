import React, { useState } from 'react'
import * as S from '@/styles/onboarding/SelectLanguagePage.styles'
import { useNavigate } from 'react-router-dom'
import i18n from '@/i18n'
import axios from 'axios'
import globalIcon from '@/assets/icon-global-language.svg'
import navigationIcon from '@/assets/icon-navigation.svg'
import { TextContainer } from '@/styles/signup/SelectMarketPage.styles'
import LanguageButton from '@/components/onboarding/LanguageButton'
import { useTranslation } from 'react-i18next'

const OnboardingPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation() //임시 확인용
  const [selectedId, setSelectedId] = useState(null)

  // 언어 객체 매핑
  const LANG_BY_ID = {
    1: { code: 'en', name: 'English' },
    2: { code: 'zh', name: '中文' },
    3: { code: 'ja', name: '日本語' },
  }

  const language = [
    { id: 1, name: 'English' },
    { id: 2, name: '中文' },
    { id: 3, name: '日本語' },
  ]

  // 선택언어
  const langCode = selectedId ? LANG_BY_ID[selectedId]?.code || 'en' : null

  // 소상공인 페이지로 이동
  const handleStore = () => {
    i18n.changeLanguage('ko')
    navigate('/login')
  }

  // 고객 페이지로 이동 (영어/중국어/한국어)
  const handleContinue = () => {
    if (!selectedId) return
    // 다음 페이지로 이동하면서 언어 객체를 함께 전달 (기본은 영어)
    const lang = LANG_BY_ID[selectedId]?.code || 'en'

    // 전역 언어 변경 (헤더/푸터 등 즉시 해당 언어로 재렌더링)
    i18n.changeLanguage(lang)

    // 고객용 메인 페이지 이동
    navigate('user/map')
  }
  return (
    <S.Container>
      <S.Scroll className='scrollable'>
        <S.Wrapper>
          <S.Img src={globalIcon} alt='Global' />
          <S.Main>
            <S.TextContainer>
              <S.Title>Select Language</S.Title>
              <S.Title>选择语言</S.Title>
              <S.Title>言語を選択</S.Title>
            </S.TextContainer>
            <LanguageButton options={language} value={selectedId} onChange={setSelectedId} />
            <S.Navigation type='button' onClick={handleStore}>
              <S.Icon src={navigationIcon} alt='' />
              <S.Text>소상공인으로 계속하기</S.Text>
            </S.Navigation>
          </S.Main>
          {selectedId && (
            <S.ContinueButton type='button' onClick={handleContinue}>
              {t('button.continue', { lng: langCode || 'en' })}
            </S.ContinueButton>
          )}
        </S.Wrapper>
      </S.Scroll>
    </S.Container>
  )
}

export default OnboardingPage
