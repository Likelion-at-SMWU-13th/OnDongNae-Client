import { useEffect, useRef } from 'react'

export default function usePreloadImages(srcs = []) {
  const cacheRef = useRef([]) // 가비지 컬렉션 방지용으로 참조 유지

  useEffect(() => {
    if (typeof window === 'undefined' || !srcs?.length) return

    const imgs = srcs.map((src) => {
      const img = new Image()
      img.decoding = 'async'
      img.fetchPriority = 'low'
      img.src = src
      return img
    })

    cacheRef.current = imgs

    // 메모리 정리
    return () => {
      cacheRef.current = []
    }
  }, [srcs])
}
