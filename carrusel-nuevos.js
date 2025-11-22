document.addEventListener('DOMContentLoaded', function () {
  // Milán
  var thumbsSwiperMilan = new Swiper('#swiper-thumbnails-milan', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var mainSwiperMilan = new Swiper('#swiper-milan', {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '#modeload-milan .swiper-button-next',
      prevEl: '#modeload-milan .swiper-button-prev',
    },
    thumbs: {
      swiper: thumbsSwiperMilan,
    },
  });

  // Trento
  var thumbsSwiperTrento = new Swiper('#swiper-thumbnails-trento', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var mainSwiperTrento = new Swiper('#swiper-trento', {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '#modeload-trento .swiper-button-next',
      prevEl: '#modeload-trento .swiper-button-prev',
    },
    thumbs: {
      swiper: thumbsSwiperTrento,
    },
  });

  // Parma
  var thumbsSwiperParma = new Swiper('#swiper-thumbnails-parma', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var mainSwiperParma = new Swiper('#swiper-parma', {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '#modeload-parma .swiper-button-next',
      prevEl: '#modeload-parma .swiper-button-prev',
    },
    thumbs: {
      swiper: thumbsSwiperParma,
    },
  });
});
