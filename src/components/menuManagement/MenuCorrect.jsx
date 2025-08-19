// src/components/menuManagement/MenuCorrect.jsx
import React from 'react'
import MenuCorrectRow from './MenuCorrectRow'
import LargeOrangeButton from '../common/LargeOrangeButton'

export default function MenuCorrect({ items, onPatch, onDelete, onAdd }) {
  return (
    <div style={{ padding: '0 30px 0' }}>
      {items.map((row) => (
        <MenuCorrectRow key={row.localId} row={row} onPatch={onPatch} onDelete={onDelete} />
      ))}
      <div style={{ display: 'flex', margin: '40px auto', alignItems: 'center' }}>
        <LargeOrangeButton label='메뉴 추가' onBtnClick={onAdd} />
      </div>
    </div>
  )
}
