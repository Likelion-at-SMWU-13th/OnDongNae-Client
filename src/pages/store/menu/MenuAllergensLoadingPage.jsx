import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import Loading from '@/components/common/Loading'

const MenuAllergensLoadingPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => {
      const raw = state?.AllergensData
      const ok = raw?.success === true
      const results = raw?.data?.results ?? []

      if (!ok || results.length === 0) {
        navigate('/menu/allergens/fail', { replace: true })
        return
      }
      const initialResults = results.map((it) => ({
        menuId: it.menuId,
        nameKo: it.nameKo ?? it.name ?? '',
        allergiesCanonical: Array.isArray(it.allergiesCanonical) ? it.allergiesCanonical : [],
      }))

      navigate('/menu/allergens/success', { state: { initialResults }, replace: true })
    }, 600)

    return () => clearTimeout(t)
  }, [state, navigate])

  return (
    <div>
      <Loading text='인공지능이 음식 성분을 분석하고 있어요' />
    </div>
  )
}

export default MenuAllergensLoadingPage
