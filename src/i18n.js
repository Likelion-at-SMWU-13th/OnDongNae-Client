// 언어 파일을 로드하고 기본 언어를 설정

// src/i18n.js
// ─────────────────────────────────────────────────────────────
// i18next 초기화 파일. 앱에서 단 1번만 import 하면 전역으로 동작합니다.
// react-i18next: 리액트 훅(useTranslation) 제공
// languagedetector: 브라우저/로컬스토리지 등에서 사용자 언어 자동 감지
// ─────────────────────────────────────────────────────────────
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 번역 리소스(정적 JSON) 로드
// 실제 서비스에선 namespace 단위로 나누기도 합니다. (common, header, footer 등)
// 여기서는 가장 단순하게 'common' 네임스페이스만 사용합니다.
import en from './locales/en/common.json'
import zh from './locales/zh/common.json'
import ja from './locales/ja/common.json'

i18n
  // 사용자의 언어를 어디서 감지할지 설정해 주는 플러그인
  // - localStorage: 이전에 선택한 언어가 저장되어 있으면 우선 사용
  // - navigator: 브라우저 기본 언어(예: 'en-US')에서 'en' 추출하여 사용
  // - htmlTag: <html lang="..."> 값 추출
  .use(LanguageDetector)
  // react-i18next를 i18next 인스턴스에 연결
  .use(initReactI18next)
  .init({
    // 앱에서 사용할 번역 리소스(메모리 상에 올려 사용)
    // key: 언어코드(en/zh/ja), value: { 네임스페이스: JSON }
    resources: {
      en: { common: en },
      zh: { common: zh },
      ja: { common: ja },
    },

    // 사용자가 가진 언어가 없거나 감지 실패할 때 기본으로 사용할 언어
    fallbackLng: 'en',

    // 네임스페이스 설정
    // - ns: 사용할 네임스페이스 목록
    // - defaultNS: useTranslation()에서 기본으로 참조할 네임스페이스
    ns: ['common'],
    defaultNS: 'common',

    // 리액트 환경에서 XSS 방지 이스케이프는 리액트가 수행하므로 false 권장
    interpolation: { escapeValue: false },

    // 언어 감지 플러그인 설정
    detection: {
      // 언어를 어떤 순서로 감지할지
      // localStorage('i18nextLng') → 브라우저 → <html lang="...">
      order: ['localStorage', 'navigator', 'htmlTag'],
      // 감지/선택된 언어를 어디에 캐시해 둘지
      // 기본 키는 'i18nextLng'로 저장됩니다.
      caches: ['localStorage'],
    },

    // 동기 로드 환경에서 Suspense를 사용하지 않도록(편의상)
    react: { useSuspense: false },
  })

export default i18n

// ※ 이 파일은 엔트리(예: src/main.jsx 또는 src/App.jsx) 최상단에서
//    단 한 번 `import './i18n'` 해 주면 앱 전역에서 i18n이 준비됩니다.
