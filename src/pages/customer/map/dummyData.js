// 시장/카테고리/가게 정보 임시 데이터
// 연동 후 삭제 필요

const dummyData = {
  code: 'OK',
  message: '요청이 성공했습니다.',
  success: true,
  data: {
    marketOptions: [
      { name: 'Yongsan Yongmun Market', id: 1 },
      { name: 'Itaewon Market', id: 2 },
      { name: 'Huam Traditional Market', id: 3 },
      { name: 'Manri Market', id: 4 },
      { name: 'Haebangchon Sinheung Market', id: 5 },
    ],
    categoryOptions: [
      {
        mainCategoryId: 1,
        mainCategoryName: 'Fresh Produce & Food',
        subCategories: [
          { name: 'Fruits & Vegetables', id: 1 },
          { name: 'Seafood', id: 2 },
          { name: 'Meat & Livestock', id: 3 },
          { name: 'Grains', id: 4 },
          { name: 'Side Dishes', id: 5 },
          { name: 'Rice Cakes & Baked Goods', id: 6 },
        ],
      },
      {
        mainCategoryId: 2,
        mainCategoryName: 'Restaurants & Cafés',
        subCategories: [
          { name: 'Korean Cuisine', id: 7 },
          { name: 'Korean Snacks', id: 8 },
          { name: 'Sashimi & Seafood', id: 9 },
          { name: 'International Cuisine', id: 10 },
          { name: 'Fusion Cuisine', id: 11 },
          { name: 'Cafes & Tea', id: 12 },
        ],
      },
      {
        mainCategoryId: 3,
        mainCategoryName: 'Pubs & Bars',
        subCategories: [
          { name: 'Korean Traditional Pub', id: 13 },
          { name: 'Beer Pub', id: 14 },
          { name: 'Bar', id: 15 },
          { name: 'Izakaya', id: 16 },
        ],
      },
      {
        mainCategoryId: 4,
        mainCategoryName: 'General Goods',
        subCategories: [
          { name: 'Clothing & Shoes', id: 17 },
          { name: 'General Goods', id: 18 },
          { name: 'Home Supplies', id: 19 },
        ],
      },
      {
        mainCategoryId: 5,
        mainCategoryName: 'Souvenirs & Crafts ',
        subCategories: [
          { name: 'Souvenir Shop', id: 20 },
          { name: 'Hanbok & Traditional Clothing', id: 21 },
          { name: 'Crafts', id: 22 },
          { name: 'Accessory Shop', id: 23 },
        ],
      },
      {
        mainCategoryId: 6,
        mainCategoryName: 'Services & Others',
        subCategories: [],
      },
    ],
    randomStores: [
      {
        id: 18,
        name: 'Egg & Flower',
        isOpen: true,
        subCategories: ['International Cuisine'],
        address: '35, Sinheung-ro 26-gil, Yongsan-gu, Seoul',
        phone: '0507-1328-7681',
        image: 'https://gorugoru-bucket/main.png',
      },
      {
        id: 5,
        name: 'Seoul Soup 2',
        isOpen: false,
        subCategories: ['Meat & Livestock', 'Fruits & Vegetables'],
        address: '100, Cheongpa-ro 47-gil, Yongsan-gu, Seoul',
        phone: '010-0000-0000',
        image: 'https://gorugoru-bucket/main.png',
      },
      {
        id: 12,
        name: 'Ondongnae',
        isOpen: false,
        subCategories: ['Meat & Livestock', 'Fruits & Vegetables'],
        address: '35, Sinheung-ro 26-gil, Yongsan-gu, Seoul',
        phone: '0507-1328-7681',
        image: 'https://gorugoru-bucket/main.png',
      },
    ],
  },
}

export default dummyData
