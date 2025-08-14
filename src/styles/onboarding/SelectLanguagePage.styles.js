import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 82px;
`
export const Img = styled.img`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`
export const TextContainer = styled.div`
  padding-top: 25px;
`

export const Title = styled.p`
  color: #000;
  text-align: center;
  font-feature-settings: 'dlig' on;
  font-size: 20px;
  font-weight: 400;
`
export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`

export const Navigation = styled.button`
  display: flex;
  flex-direction: row;
  gap: 5px;
  background: white;
  border: none;
  cursor: pointer;
  margin-bottom: 77px;
`
export const Icon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`
export const Text = styled.p`
  color: #000;
  text-align: center;
  font-feature-settings: 'dlig' on;
  font-size: 18px;
  font-weight: 300;
`

export const ContinueButton = styled.button`
  width: 80%;
  height: 41px;
  border-radius: 10px;
  background: #f08e67;

  color: #fff;
  text-align: center;
  font-feature-settings: 'dlig' on;
  font-size: 25px;
  font-weight: 400;
  border: none;
  cursor: pointer;
`
