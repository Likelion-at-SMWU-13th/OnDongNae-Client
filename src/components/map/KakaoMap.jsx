import { Map } from 'react-kakao-maps-sdk'

const KakaoMap = () => {
  return (
    // 용산구 중심으로 보여주기
    <Map
      center={{ lat: 37.5326, lng: 126.9905 }}
      level={6}
      style={{
        width: '100%',
        height: 'calc(100dvh - 155px)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    ></Map>
  )
}

export default KakaoMap
