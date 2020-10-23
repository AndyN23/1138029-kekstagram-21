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
      description: getRandomValue(DESCRIPTIONS),
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


  // Работаем с большой картинкой
  // Блок коментариев
  // находим и берем блок коммента за основу - клонируем
  const socialComment = document.querySelector('.social__comment');
  const getSocialComment = function (data) {
    let socialCommentCopy = socialComment.cloneNode(true);
    // заполняемые элементы блока - аватар, имя
    let socialCommentImg = socialCommentCopy.querySelector('.social__picture');
    socialCommentImg.src = data.avatar;
    socialCommentImg.alt = data.name;
    // Заполняем текстом комментария
    let socialCommentText = socialCommentCopy.querySelector('p');
    socialCommentText.textContent = data.message;

    return socialCommentCopy;
  };


// Находим полноразмерную картинку
const bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');

// Находим блок всех комментариев к изображению
const socialCommentTemplate = document.querySelector('.social__comments');

let showBigPicture = function (item) {
  // Показываем картинку большую
  bigPicture.classList.remove('hidden');
  // Находим элементы для заполнения
 let bigPictureImg = bigPicture.querySelector('.big-picture__img');
  // адрес картинки
  bigPictureImg.src = item.url;
  // кол-во лайков
  bigPicture.querySelector('.likes-count').textContent = item.likes;
  // комментарии
  bigPicture.querySelector('.comments-count').textContent = item.comments.length;

  // Создает фрагмент, для вставки комменатриев
  const fragment = document.createDocumentFragment();
  // Заполняет новые комментарии
   for (let i = 0; i < item.comments.length; i++) {
     fragment.appendChild(getSocialComment(item.comments[i]));
   }
   // Чистит блок комментариев в разметке
   socialCommentTemplate.innerHTML = '';
    console.log (item.comments.length)
   // Добавляет новые комментарии
   socialCommentTemplate.appendChild(fragment);
   // Описание фотографии
   bigPicture.querySelector('.social__caption').textContent = item.description;

  return showBigPicture;
};

// открываем большую картинку
document.querySelector('.social__comment-count').classList.add('hidden');
// скрываем счетчик комментариев
document.querySelector('.comments-loader').classList.add('hidden');
// // убираем прокрутку фона
// document.querySelector('body').classList.add('modal-open');
// Запускаем функцию
showBigPicture(userPhotos[0]);

// // Открытие каждой картинки
// // находим все миниатюры и заносим в массив
// photoContainer.addEventListener('click', function(evt) {
//   renderTarget(evt);
// });

// // // Закрытие окна при нажатии ESC
// // document.addEventListener('keydown', function (evt) {
// //   if (evt.key === 'Escape') {
// //     // openUploadForm.classList.add('hidden');
// //     // openModal.classList.add('visually-hidden');
// //     // openModal.value = '';
// //     document.querySelector('body').classList.remove('modal-open');
// //     document.querySelector('.big-picture').classList.add('hidden');
// //   }
// // });
// //   // Закрытие окна при клике
// //   modalClose.addEventListener('click', function () {
// //     openUploadForm.classList.add('hidden');
// //     openModal.classList.add('visually-hidden');
// //     document.querySelector('body').classList.remove('modal-open');
// //   });
// const renderTarget = function (evt) {
//   let target = evt.target.closest('.picture');
//   if(!target) {
//     return
//   };
//   if(!photoConteiner.contains(target)) {
//     return
//   };
//   let index = target.dataset.index;
//   showBigPicture(userPhotos[index]);
// };

  // Закрытие полноразмерного окна
const closeBigPicture = document.querySelector('.big-picture__cancel');
closeBigPicture.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});

// })();
