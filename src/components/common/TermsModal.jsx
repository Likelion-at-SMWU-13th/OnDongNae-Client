import React from 'react'
import styled from 'styled-components'
import closeButton from '@/assets/button-close.svg'

const TermsModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <Wrapper onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {' '}
        <Header>
          <Title>{title}</Title>
          <CloseButton src={closeButton} alt='닫기' onClick={onClose} />
        </Header>
        <Content>{children}</Content>
      </ModalContainer>
    </Wrapper>
  )
}

export default TermsModal

const Wrapper = styled.div`
  width: min(100vw, 390px);
  height: 100%;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`

const ModalContainer = styled.div`
  width: 85%;
  background-color: white;
  border-radius: 10px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.p`
  font-size: 1.0625rem;
  font-weight: 600;
`

const CloseButton = styled.img`
  cursor: pointer;
  width: 30px;
  height: 30px;
`

const Content = styled.div`
  white-space: pre-wrap;
  font-size: 0.9375rem;
  font-weight: 400;
`
