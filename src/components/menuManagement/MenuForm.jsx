import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuFormRow from '@/components/menuManagement/MenuFormRow'
import LargeLightOrangeButton from '@/components/common/LargeLightOrangeButton'
import SmallGrayButton from '@/components/common/SmallGrayButton'
import SmallOrangeButton from '../common/SmallOrangeButton'
const MenuForm = () => {
  const [items, setItems] = useState([
    { id: 1, nameKo: '', priceKrw: 0 },
    { id: 2, nameKo: '', priceKrw: 0 },
  ])
  const navigate = useNavigate()

  const addRow = () => {
    const nextId = items[items.length - 1].id + 1
    setItems([...items, { id: nextId, nameKo: '', priceKrw: 0 }])
  }

  const updateRow = (id, key, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [key]: value } : item)))
  }
  const handleBack = () => navigate(-1)
  const handleSave = async () => {
    const payload = {
      items: items.map(({ nameKo, priceKrw }) => ({ nameKo, priceKrw })),
    }
    navigate('/menu/confirm')
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
      <LargeLightOrangeButton label='메뉴 추가' onBtnClick={addRow} />
      <SmallGrayButton type='button' label='취소' onBtnClick={handleBack} />
      <SmallOrangeButton type='submit' label='저장' onBtnClick={handleSave} />
    </div>
  )
}

export default MenuForm
