// i18next 초기화 파일. 최상단의 App.jsx에서 import 하여 사용할 예정
// languagedetector: 브라우저/로컬스토리지 등에서 사용자 언어 자동 감지
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 번역 json 파일 로드
import en from './locales/en/common.json'
import zh from './locales/zh/common.json'
import ja from './locales/ja/common.json'
import ko from './locales/ko/common.json'

i18n
  // 사용자의 언어를 어디서 감지할지 설정해 주는 플러그인(localStorage / navigator / htmlTag 에서 값 추출)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // key: 언어코드(en/zh/ja/ko), value: { 네임스페이스: JSON }
    resources: {
      en: { common: en },
      zh: { common: zh },
      ja: { common: ja },
      ko: { common: ko },
    },

    // 사용자가 가진 언어가 없거나 감지 실패할 때 기본으로 사용할 언어
    fallbackLng: 'en',

    // 네임스페이스 설정 (ns: 사용할 네임스페이스 목록 / defaultNS: useTranslation()에서 기본으로 참조할 네임스페이스)
    ns: ['common'],
    defaultNS: 'common',

    interpolation: { escapeValue: false },

    // 언어 감지 플러그인 설정
    detection: {
      // 언어를 어떤 순서로 감지할지 (로컬스토리지 -> 브라우저 -> html 태그)
      order: ['localStorage', 'navigator', 'htmlTag'],
      // 감지/선택된 언어를 로컬스토리지에 캐시해두기
      caches: ['localStorage'],
    },

    react: { useSuspense: false },
  })

export default i18n
