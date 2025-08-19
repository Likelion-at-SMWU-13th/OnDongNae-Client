// src/components/menuManagement/MenuCorrectRow.jsx
import React from 'react'

export default function MenuCorrectRow({ row, onPatch, onDelete }) {
  const { localId, nameKo, priceKrw, isEditing } = row

  const toggleEdit = () => onPatch(localId, { isEditing: !isEditing })
  const handleNameChange = (e) => onPatch(localId, { nameKo: e.target.value })
  const handlePriceChange = (e) => {
    const onlyNum = e.target.value.replace(/\D/g, '')
    onPatch(localId, { priceKrw: onlyNum ? Number(onlyNum) : 0 })
  }
  const handleDelete = () => onDelete(localId)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 100px 1fr 1fr',
        alignItems: 'center',
        gap: 10,
        padding: '50px 0 0 0',
      }}
    >
      {/* 메뉴 이름 */}
      <input
        type='text'
        value={nameKo}
        onChange={handleNameChange}
        readOnly={!isEditing}
        placeholder='메뉴명'
        style={{
          width: '100px',
          textAlign: 'left',
          border: 'none',
          borderBottom: 'none',
          background: 'transparent',
          color: '#000',
          fontSize: '19px',
          fontWeight: 500,
        }}
      />

      {/* 가격 */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <span>₩</span>
        <input
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          value={priceKrw}
          onChange={handlePriceChange}
          readOnly={!isEditing}
          placeholder='0'
          style={{
            width: '100%',
            textAlign: 'left',
            border: 'none',
            borderBottom: 'none',
            background: 'transparent',
            color: '#000',
            fontSize: '18px',
            fontWeight: '400',
          }}
        />
      </div>

      {/* 수정 토글 */}
      <button
        type='button'
        onClick={toggleEdit}
        style={{
          display: 'flex',
          width: '55px',
          height: '39px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          border: 'none',
          borderRadius: '10px',
          background: '#FEB99D',
          color: '#fff',
          fontSize: '17px',
          fontWeight: 600,
        }}
      >
        {isEditing ? '완료' : '수정'}
      </button>
      {/* 삭제 */}
      <button
        type='button'
        onClick={handleDelete}
        style={{
          display: 'flex',
          width: '55px',
          height: '39px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          border: 'none',
          borderRadius: '10px',
          background: '#D6D6D6',
          color: '#fff',
          fontSize: '17px',
          fontWeight: 600,
        }}
      >
        삭제
      </button>
    </div>
  )
}
