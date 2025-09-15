import React, { useState } from 'react'
import * as S from '@/styles/onboarding/SelectLanguagePage.styles'
import { useNavigate } from 'react-router-dom'
import i18n from '@/i18n'
import globalIcon from '@/assets/icon-global-language.svg'
import navigationIcon from '@/assets/icon-navigation.svg'
import LanguageButton from '@/components/onboarding/LanguageButton'
import { useTranslation } from 'react-i18next'

const SelectLanguagePage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation() //임시 확인용
  const [selectedId, setSelectedId] = useState(null)

  // 언어 매핑
  const languages = [
    { id: 1, code: 'en', name: 'English' },
    { id: 2, code: 'zh', name: '中文' },
    { id: 3, code: 'ja', name: '日本語' },
  ]

  // 선택언어
  const selectedLang = languages.find((lang) => lang.id === selectedId)
  const langCode = selectedLang?.code

  // 소상공인 페이지로 이동
  const handleStore = () => {
    i18n.changeLanguage('ko')
    navigate('/login')
  }

  // 고객 페이지로 이동 (영어/중국어/한국어)
  const handleContinue = () => {
    if (!langCode) return

    // 전역 언어 변경 (헤더/푸터 등 즉시 해당 언어로 재렌더링)
    i18n.changeLanguage(langCode)

    // 고객용 메인 페이지 이동
    navigate('/onboarding/1')
  }
  return (
    <S.Container>
      <S.Scroll className='scrollable'>
        <S.Wrapper>
          <S.Img src={globalIcon} alt='Global' />
          <S.Main>
            <S.Title>GoruGoru</S.Title>
            <LanguageButton
              options={languages}
              value={selectedId}
              onChange={(id) => {
                setSelectedId(id)

                const selected = languages.find((lang) => lang.id === id)
                if (selected) {
                  i18n.changeLanguage(selected.code)
                  setTimeout(() => {
                    navigate('/onboarding/1')
                  }, 1300)
                }
              }}
            />{' '}
            <S.Navigation type='button' onClick={handleStore}>
              <S.Icon src={navigationIcon} alt='' />
              <S.Text>소상공인으로 계속하기</S.Text>
            </S.Navigation>
          </S.Main>
        </S.Wrapper>
      </S.Scroll>
    </S.Container>
  )
}

export default SelectLanguagePage
