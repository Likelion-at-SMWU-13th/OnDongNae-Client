import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import authAxios from '@/lib/authAxios'
import Loading from '@/components/common/Loading'

const CourseLoading = () => {
  const { t, i18n } = useTranslation()
  const { state } = useLocation()
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()

  useEffect(() => {
    const lang = (i18n.language || 'en').split('-')[0]

    authAxios
      .post(`${API_URL}/courses/recommend`, state, {
        headers: { 'Accept-Language': lang },
      })
      .then((res) => {
        console.log(res)
        navigate('/user/course/result', { state: res.data.data })
      })
      .catch((err) => {
        console.error(err)
        navigate('/user/course/AI/fail')
      })
  }, [])

  return (
    <div>
      <Loading text={t('course.loading')} />
    </div>
  )
}
export default CourseLoading
