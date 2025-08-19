import React, { useEffect, useState } from 'react'
import * as S from '@/styles/map/MapStoresPage.styles'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import BottomNav from '@/components/common/BottomNav'

import ImgSection from '@/components/map/ImgSection'
import HeaderSection from '@/components/map/HeaderSection'
import MapSection from '@/components/map/MapSection'
import TabSection from '@/components/map/TabSection'
import MenuTab from '@/components/map/MenuTab'
import InfoTab from '@/components/map/InfoTab'
const MyStoreInfoPage = () => {
  const [tab, setTab] = useState('menu') // 일단 메뉴탭 보여주기
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''

    axios
      .get(`${apiUrl}/me/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {})
      .catch((err) => {
        alert('가게 정보를 불러오지 못했어요.')
        console.log(err)
      })
  }, [])

  return <div></div>
}

export default MyStoreInfoPage
