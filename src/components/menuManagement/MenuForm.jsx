import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import MenuFormRow from '@/components/menuManagement/MenuFormRow'
import LargeLightOrangeButton from '@/components/common/LargeLightOrangeButton'
import SmallGrayButton from '@/components/common/SmallGrayButton'
import SmallOrangeButton from '../common/SmallOrangeButton'
import axios from 'axios'

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 21px;
`
const SaveBtnContainer = styled.div`
  margin-top: 130px;
  display: flex;
  flex-direction: row;
  gap: 21px;
  justify-content: center;
`
const MenuForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''
  const [items, setItems] = useState([
    { id: 1, nameKo: '', priceKrw: 0 },
    { id: 2, nameKo: '', priceKrw: 0 },
  ])
  const navigate = useNavigate()

  const addRow = () => {
    const nextId = (items[items.length - 1]?.id ?? 0) + 1
    setItems([...items, { id: nextId, nameKo: '', priceKrw: 0 }])
  }

  const updateRow = (id, key, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [key]: value } : item)))
  }
  const handleBack = () => navigate(-1)
  const handleSave = () => {
    const payload = {
      items: items
        .map(({ nameKo, priceKrw }) => ({ nameKo, priceKrw }))
        .filter((it) => it.nameKo && it.priceKrw > 0), // 이름 있고 0원 초과만
    }

    axios
      .post(`${apiUrl}/me/menus/save`, payload, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data) // 연동 확인 후 삭제
        navigate('/menu/extract/save')
      })
      .catch((err) => {
        console.error(err)
        alert('저장 실패!')
      })
  }

  return (
    <div>
      {items.map((item) => (
        <MenuFormRow
          key={item.id}
          name={item.nameKo}
          price={item.priceKrw}
          onChangeName={(val) => updateRow(item.id, 'nameKo', val)}
          onChangePrice={(val) => updateRow(item.id, 'priceKrw', Number(val))}
        />
      ))}
      <ButtonContainer>
        <LargeLightOrangeButton label='메뉴 추가' onBtnClick={addRow} />
        <SaveBtnContainer>
          <SmallGrayButton type='button' label='취소' onBtnClick={handleBack} />
          <SmallOrangeButton type='submit' label='저장' onBtnClick={handleSave} />
        </SaveBtnContainer>
      </ButtonContainer>
    </div>
  )
}

export default MenuForm
