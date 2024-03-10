const hairCuts = [
  {
    id: '1',
    name: 'Pixie Cut',
    description: 'Short hairstyle where hair is cropped close to the head.',
    price: 40.0,
    photoUri:[
      'https://imgs.search.brave.com/RRxiaVLlMLt97kwMvNXvsDqEIBy-hiJE9097bRbEdso/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ibG9n/Lm5ld29sZG1hbi5j/b20uYnIvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjAvMDIvQ29y/dGUtRGUtQ2FiZWxv/LU1hc2N1bGluby1T/bGlja2VkLUJhY2st/b3UtUGFyYS1UcmFz/LTkuanBn',
    ]
  },
  {
    id: '2',
    name: 'Bob Cut',
    description: 'A classic short-to-medium hairstyle where hair is typically cut straight around the head.',
    price: 50.0,
    photoUri:[
      'https://content.latest-hairstyles.com/wp-content/uploads/mens-short-fade-haircuts.jpg',
    ] 
  },
  {
    id: '3',
    name: 'Layered Cut',
    description: 'A versatile hairstyle with layers of varying lengths to add volume and texture.',
    price: 60.0,
    photoUri: [
      'https://i.pinimg.com/736x/09/25/9d/09259d4ab3cbf58d8d09312d4c1816b8.jpg',
    ]
  },
];

const getRandomHairCut = () => Math.floor(Math.random() * hairCuts.length);

export const haircuts = Array.from({ length: 100 }).map(() => hairCuts[getRandomHairCut()]);
