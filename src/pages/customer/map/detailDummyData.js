// 연동 후 제거

const detailDummyData = {
  code: 'OK',
  message: '가게 상세 조회 성공',
  success: true,
  data: {
    header: {
      images: ['https://example.com/store1_1.jpg', 'https://example.com/store1_2.jpg'],
      name: 'Ondongnae',
      nameKo: '온동네',
      status: {
        todayOpenTime: '11:00',
        todayCloseTime: '18:00',
        todayClosed: true,
        open: true,
      },
      weeklyHours: [
        {
          day: 'MON',
          open: '11:00',
          close: '21:00',
          closed: false,
        },
        {
          day: 'TUE',
          open: '11:00',
          close: '21:00',
          closed: false,
        },
        {
          day: 'WED',
          open: '11:00',
          close: '21:00',
          closed: false,
        },
        {
          day: 'THU',
          open: '11:00',
          close: '21:00',
          closed: false,
        },
        {
          day: 'FRI',
          open: '11:00',
          close: '22:00',
          closed: false,
        },
        {
          day: 'SAT',
          open: '12:00',
          close: '22:00',
          closed: false,
        },
        {
          day: 'SUN',
          open: null,
          close: null,
          closed: true,
        },
      ],
      shortIntro:
        'A snack bar specializing in traditional tteokbokki and sundae made with fresh ingredients, offering delicious flavors.',
    },
    menuTab: [
      {
        name: 'Classic Tteokbokki',
        priceKrw: 5000,
        allergies: ['Wheat'],
      },
    ],
    infoTab: {
      longIntro:
        'Ondongnae Tteokbokki is loved for its sweet and spicy sauce and variety of toppings.',
      phone: '02-999-8888',
      address: '00-ro 11, Yongsan-gu, Seoul',
    },
    map: {
      lat: 37.541,
      lng: 126.972,
    },
  },
}

export default detailDummyData
