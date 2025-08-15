// 연동 후 제거 (ZH)

const detailDummyDataZh = {
  code: 'OK',
  message: '门店详情查询成功',
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
        { day: 'MON', open: '11:00', close: '21:00', closed: false },
        { day: 'TUE', open: '11:00', close: '21:00', closed: false },
        { day: 'WED', open: '11:00', close: '21:00', closed: false },
        { day: 'THU', open: '11:00', close: '21:00', closed: false },
        { day: 'FRI', open: '11:00', close: '22:00', closed: false },
        { day: 'SAT', open: '12:00', close: '22:00', closed: false },
        { day: 'SUN', open: null, close: null, closed: true },
      ],
      shortIntro: '以新鲜食材制作传统辣炒年糕与米肠的小吃店，风味可口。',
    },
    menuTab: [
      {
        name: '经典辣炒年糕',
        priceKrw: 5000,
        allergies: ['小麦'],
      },
      {
        name: '韩国米肠（Sundae）',
        priceKrw: 7000,
        allergies: ['猪肉', '牛肉', '小麦', '大豆'],
      },
      {
        name: '鱼糕串',
        priceKrw: 1000,
        allergies: ['小麦', '大豆', '鱼类'],
      },
    ],
    infoTab: {
      longIntro: 'Ondongnae 辣炒年糕因其甜辣酱汁和多样配料而深受喜爱。',
      phone: '02-999-8888',
      address: '韩国首尔市龙山区00路11号',
    },
    map: {
      lat: 37.541,
      lng: 126.972,
    },
  },
}

export default detailDummyDataZh
