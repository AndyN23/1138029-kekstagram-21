'use strict';
const MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const NAMES = [
  `Henry`,
  `Nancy`,
  `Stifler`,
  `Sara`,
  `Jose`
];

const DESCRIPTIONS = [
  `Описание фото 1`,
  `Описание фото 2`,
  `Описание фото 3`,
  `Описание фото 4`
];


const getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


// метод случайного числа в диапазоне
const getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// создаем случайные комментарии
const getRandomComment = function () {
  let comment = [];
  let commentCount = getRandomInteger(1, 6);

  for (let i = 0; i < commentCount; i++) {
    comment.push({
      avatar: `img/avatar-` + getRandomInteger(1, 6) + `.svg`,
      message: getRandomValue(MESSAGES),
      name: getRandomValue(NAMES),
    });
  }
  return comment;
};

// getRandomInteger(0, MESSAGES.lenght)
// getRandomInteger(0, NAMES.lenght)

const userPhotos = [];
const photosCount = 25;
const createUserPhotos = function () {
  for (let i = 1; i <= photosCount; i++) {
    userPhotos.push({
      url: `photos/` + i + `.jpg`,
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.lenght)],
      likes: getRandomInteger(15, 200),
      comments: getRandomComment(),
    });
  }
};

const photoContainer = document.querySelector(`.pictures`);
const photoTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);


createUserPhotos();

const createNewPhoto = function (photoIndex) {
  // клонируем со всем наполнением
  const newPhoto = photoTemplate.cloneNode(true);
  const newPhotoImg = newPhoto.querySelector(`.picture__img`);
  newPhotoImg.src = photoIndex.url;
  newPhoto.querySelector(`.picture__img`).alt = photoIndex.description;
  newPhoto.querySelector(`.picture__comments`).textContent = photoIndex.comments;
  newPhoto.querySelector(`.picture__likes`).textContent = photoIndex.likes;
  return newPhoto;
};

// Функция для объединение в фрагмент и его наполнение с выводом на экран всех изображений
const addListUserPhotos = function (listPhotos) {
  // создаем фрагмент
  const fragment = document.createDocumentFragment();
  // заполняем фрагмент фотками - 25 шт
  for (let i = 0; i < listPhotos.length; i++) {
    fragment.appendChild(createNewPhoto(listPhotos[i]));
  }
  // console.log("addListUserPhotos",
  //   {
  //     listPhotos
  //   });
  photoContainer.appendChild(fragment);
};

addListUserPhotos(userPhotos);
