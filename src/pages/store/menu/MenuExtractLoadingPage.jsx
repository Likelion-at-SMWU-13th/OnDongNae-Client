import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Loading from '@/components/common/Loading'
import SubTitle from '@/components/signup/SubTitle'

const MenuExtractLoadingPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const t = setTimeout(() => {
      const raw = state?.MenuData // 업로드 페이지에서 넘긴 res.data 전체
      const ok = raw?.success === true // success 확인
      const items = raw?.data?.items ?? [] // 실제 메뉴 배열
      const itemData = raw?.data
      if (!ok || items.length === 0) {
        navigate('/menu/extract/fail', { replace: true })
        return
      }
      const initialItems = items.map((it) => ({
        nameKo: it.name,
        priceKrw: it.priceKrw,
      }))

      navigate('/menu/extract/success', { state: { initialItems }, replace: true })
    }, 3000)

    return () => clearTimeout(t)
  }, [state, navigate])
  return (
    <>
      <Loading text='메뉴를 추출하고 있어요' />
    </>
  )
}

export default MenuExtractLoadingPage
