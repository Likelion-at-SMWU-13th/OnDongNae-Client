// src/lib/authAxios.js
import axios from 'axios'

// 1차 요청이 401이면 refresh Token으로 새로운 토큰 발급 받기 -> 원 요청 재시도
const API_BASE = import.meta.env.VITE_API_URL
const REFRESH_PATH = '/auth/token/refresh'

const authRequest = (makeRequest, opts = {}) => {
  const firstAccess = localStorage.getItem('accessToken') || ''

  return makeRequest(firstAccess).catch((err) => {
    const is401 = axios.isAxiosError(err) && err.response?.status === 401
    if (!is401) {
      return
    }

    // 401 에러 발생 시 refresh token 로컬스토리지에서 가져오기
    const refreshToken = localStorage.getItem('refreshToken') || ''
    if (!refreshToken) {
      return
    }

    return axios
      .post(`${API_BASE}${REFRESH_PATH}`, refreshToken, {
        headers: { 'Content-Type': 'text/plain' },
      }) // 서버 스펙에 따라 키 이름 변경 가능
      .then((res) => {
        const nextAccess = res.data.data.accessToken
        const nextRefresh = res.data.data.refreshToken

        if (!nextAccess) {
          throw new Error('No accessToken in refresh response')
        }

        // 새 토큰 저장
        localStorage.setItem('accessToken', nextAccess)
        if (nextRefresh) localStorage.setItem('refreshToken', nextRefresh)

        // 원 요청 재시도
        return makeRequest(nextAccess)
      })
  })
}

/**
 * axios를 감싼 간단한 “인증 포함” 헬퍼들
 * - 필요하면 headers/params 등 그대로 넘기면 됨
 */
const withAuthHeaders = (cfg = {}, token) => ({
  ...cfg,
  headers: {
    ...(cfg.headers || {}),
    Authorization: `Bearer ${token}`,
  },
})

export const authAxios = {
  get: (url, cfg = {}) => authRequest((token) => axios.get(url, withAuthHeaders(cfg, token))),

  delete: (url, cfg = {}) => authRequest((token) => axios.delete(url, withAuthHeaders(cfg, token))),

  post: (url, data, cfg = {}) =>
    authRequest((token) => axios.post(url, data, withAuthHeaders(cfg, token))),

  put: (url, data, cfg = {}) =>
    authRequest((token) => axios.put(url, data, withAuthHeaders(cfg, token))),

  patch: (url, data, cfg = {}) =>
    authRequest((token) => axios.patch(url, data, withAuthHeaders(cfg, token))),
}

export default authAxios
