// dummyData.ts (or .js)

// 👉 /map mock (matches your code: dummyData.data.randomStores)
const dummyData = {
  code: 'OK',
  message: 'Request succeeded.',
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
        mainCategoryName: 'Agri-Fishery & Food',
        subCategories: [
          { name: 'Fruits & Vegetables', id: 1 },
          { name: 'Seafood', id: 2 },
          { name: 'Meat & Livestock', id: 3 },
          { name: 'Grains', id: 4 },
          { name: 'Side Dishes', id: 5 },
          { name: 'Rice Cakes & Bakery', id: 6 },
        ],
      },
      {
        mainCategoryId: 2,
        mainCategoryName: 'Restaurants & Cafés',
        subCategories: [
          { name: 'Korean Cuisine', id: 7 },
          { name: 'Korean Snacks', id: 8 },
          { name: 'Sashimi & Seafood', id: 9 },
          { name: 'World Cuisine', id: 10 },
          { name: 'Fusion Cuisine', id: 11 },
          { name: 'Cafés & Tea', id: 12 },
        ],
      },
      {
        mainCategoryId: 3,
        mainCategoryName: 'Pubs & Bars',
        subCategories: [
          { name: 'Korean Traditional Pub', id: 13 },
          { name: 'Beer Hall', id: 14 },
          { name: 'Bar', id: 15 },
          { name: 'Izakaya', id: 16 },
        ],
      },
      {
        mainCategoryId: 4,
        mainCategoryName: 'General Goods & Daily Supplies',
        subCategories: [
          { name: 'Clothing & Shoes', id: 17 },
          { name: 'Daily Goods', id: 18 },
          { name: 'Home Goods', id: 19 },
        ],
      },
      {
        mainCategoryId: 5,
        mainCategoryName: 'Souvenirs, Crafts & Hanbok',
        subCategories: [
          { name: 'Souvenir Shop', id: 20 },
          { name: 'Hanbok & Traditional Wear', id: 21 },
          { name: 'Handicrafts', id: 22 },
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
        id: 101,
        name: 'Egg & Flower',
        isOpen: true,
        subCategories: ['World Cuisine'],
        address: '35, Sinheung-ro 26-gil, Yongsan-gu, Seoul',
        phone: '0507-1328-7681',
        image: 'https://example.com/images/egg-flower.jpg',
      },
      {
        id: 102,
        name: 'Seoul Gukbap',
        isOpen: false,
        subCategories: ['Korean Cuisine'],
        address: '100, Cheongpa-ro 47-gil, Yongsan-gu, Seoul',
        phone: '010-0000-0000',
        image: 'https://example.com/images/seoul-gukbap.jpg',
      },
      {
        id: 103,
        name: 'Itaewon Bakery',
        isOpen: true,
        subCategories: ['Rice Cakes & Bakery'],
        address: '22, Itaewon-ro, Yongsan-gu, Seoul',
        phone: '02-123-4567',
        image: 'https://example.com/images/itaewon-bakery.jpg',
      },
    ],
  },
}

// 👉 /map/filter mock (keys use lat/lng to match your marker code)
export const mapFilterMock = {
  code: 'OK',
  message: 'Request succeeded.',
  success: true,
  data: [
    {
      id: 201,
      name: 'Egg & Flower',
      isOpen: true,
      subCategories: ['World Cuisine'],
      address: '35, Sinheung-ro 26-gil, Yongsan-gu, Seoul',
      phone: '0507-1328-7681',
      image: 'https://example.com/images/egg-flower.jpg',
      lat: 37.5453523, // Haebangchon area
      lng: 126.9843008,
    },
    {
      id: 202,
      name: 'Seoul Gukbap',
      isOpen: false,
      subCategories: ['Korean Cuisine'],
      address: '100, Cheongpa-ro 47-gil, Yongsan-gu, Seoul',
      phone: '010-0000-0000',
      image: 'https://example.com/images/seoul-gukbap.jpg',
      lat: 37.5471, // near Cheongpa/Yongsan
      lng: 126.9723,
    },
    {
      id: 203,
      name: 'Yongmun Butcher',
      isOpen: true,
      subCategories: ['Meat & Livestock'],
      address: 'Yongmun Market, Yongsan-gu, Seoul',
      phone: '02-111-2222',
      image: 'https://example.com/images/yongmun-butcher.jpg',
      lat: 37.5369, // near Yongmun Market
      lng: 126.9596,
    },
    {
      id: 204,
      name: 'Huam Seafood',
      isOpen: true,
      subCategories: ['Seafood'],
      address: 'Huam-dong, Yongsan-gu, Seoul',
      phone: '02-222-3333',
      image: 'https://example.com/images/huam-seafood.jpg',
      lat: 37.5502, // near Huam Traditional Market
      lng: 126.9761,
    },
    {
      id: 205,
      name: 'Manri Izakaya',
      isOpen: false,
      subCategories: ['Izakaya'],
      address: 'Manri Market, Yongsan-gu, Seoul',
      phone: '02-333-4444',
      image: 'https://example.com/images/manri-izakaya.jpg',
      lat: 37.5511, // near Manri Market
      lng: 126.9635,
    },
    {
      id: 206,
      name: 'Itaewon Café Nimbus',
      isOpen: true,
      subCategories: ['Cafés & Tea'],
      address: 'Itaewon-ro, Yongsan-gu, Seoul',
      phone: '02-444-5555',
      image: 'https://example.com/images/itaewon-cafe.jpg',
      lat: 37.5341, // near Itaewon Market
      lng: 126.9902,
    },
  ],
}

export default dummyData
