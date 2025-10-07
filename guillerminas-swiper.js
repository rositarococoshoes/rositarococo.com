document.addEventListener('DOMContentLoaded', function () {
  // Guillerminas Negras
  var thumbsSwiperNegras = new Swiper('#swiper-thumbnails-guillermina-negras', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var mainSwiperNegras = new Swiper('#swiper-guillermina-negras', {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '#modeload-guillermina-negras .swiper-button-next',
      prevEl: '#modeload-guillermina-negras .swiper-button-prev',
    },
    thumbs: {
      swiper: thumbsSwiperNegras,
    },
  });

  thumbsSwiperNegras.on('click', function () {
    const clickedIndex = this.clickedIndex;
    const activeIndex = this.activeIndex;
    const slidesPerView = this.params.slidesPerView;
    const lastVisibleIndex = activeIndex + slidesPerView - 1;

    if (clickedIndex === lastVisibleIndex) {
      this.slideNext();
    } else if (clickedIndex === activeIndex) {
      this.slidePrev();
    }
  });

  // Guillerminas Camel
  var thumbsSwiperCamel = new Swiper('#swiper-thumbnails-guillermina-camel', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var mainSwiperCamel = new Swiper('#swiper-guillermina-camel', {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '#modeload-guillermina-camel .swiper-button-next',
      prevEl: '#modeload-guillermina-camel .swiper-button-prev',
    },
    thumbs: {
      swiper: thumbsSwiperCamel,
    },
  });

  thumbsSwiperCamel.on('click', function () {
    const clickedIndex = this.clickedIndex;
    const activeIndex = this.activeIndex;
    const slidesPerView = this.params.slidesPerView;
    const lastVisibleIndex = activeIndex + slidesPerView - 1;

    if (clickedIndex === lastVisibleIndex) {
      this.slideNext();
    } else if (clickedIndex === activeIndex) {
      this.slidePrev();
    }
  });

  // Guillerminas Blancas
  var thumbsSwiperBlancas = new Swiper('#swiper-thumbnails-guillermina-blancas', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var mainSwiperBlancas = new Swiper('#swiper-guillermina-blancas', {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '#modeload-guillermina-blancas .swiper-button-next',
      prevEl: '#modeload-guillermina-blancas .swiper-button-prev',
    },
    thumbs: {
      swiper: thumbsSwiperBlancas,
    },
  });

  thumbsSwiperBlancas.on('click', function () {
    const clickedIndex = this.clickedIndex;
    const activeIndex = this.activeIndex;
    const slidesPerView = this.params.slidesPerView;
    const lastVisibleIndex = activeIndex + slidesPerView - 1;

    if (clickedIndex === lastVisibleIndex) {
      this.slideNext();
    } else if (clickedIndex === activeIndex) {
      this.slidePrev();
    }
  });

  // Birk Negras
  var thumbsSwiperBirkNegras = new Swiper('#swiper-thumbnails-birk-negras', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var mainSwiperBirkNegras = new Swiper('#swiper-birk-negras', {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '#modeload-birk-negras .swiper-button-next',
      prevEl: '#modeload-birk-negras .swiper-button-prev',
    },
    thumbs: {
      swiper: thumbsSwiperBirkNegras,
    },
  });

  thumbsSwiperBirkNegras.on('click', function () {
    const clickedIndex = this.clickedIndex;
    const activeIndex = this.activeIndex;
    const slidesPerView = this.params.slidesPerView;
    const lastVisibleIndex = activeIndex + slidesPerView - 1;

    if (clickedIndex === lastVisibleIndex) {
      this.slideNext();
    } else if (clickedIndex === activeIndex) {
      this.slidePrev();
    }
  });

  // Birk Camel
  var thumbsSwiperBirkCamel = new Swiper('#swiper-thumbnails-birk-camel', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var mainSwiperBirkCamel = new Swiper('#swiper-birk-camel', {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '#modeload-birk-camel .swiper-button-next',
      prevEl: '#modeload-birk-camel .swiper-button-prev',
    },
    thumbs: {
      swiper: thumbsSwiperBirkCamel,
    },
  });

  thumbsSwiperBirkCamel.on('click', function () {
    const clickedIndex = this.clickedIndex;
    const activeIndex = this.activeIndex;
    const slidesPerView = this.params.slidesPerView;
    const lastVisibleIndex = activeIndex + slidesPerView - 1;

    if (clickedIndex === lastVisibleIndex) {
      this.slideNext();
    } else if (clickedIndex === activeIndex) {
      this.slidePrev();
    }
  });

  // Birk Blancas
  var thumbsSwiperBirkBlancas = new Swiper('#swiper-thumbnails-birk-blancas', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var mainSwiperBirkBlancas = new Swiper('#swiper-birk-blancas', {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '#modeload-birk-blancas .swiper-button-next',
      prevEl: '#modeload-birk-blancas .swiper-button-prev',
    },
    thumbs: {
      swiper: thumbsSwiperBirkBlancas,
    },
  });

  thumbsSwiperBirkBlancas.on('click', function () {
    const clickedIndex = this.clickedIndex;
    const activeIndex = this.activeIndex;
    const slidesPerView = this.params.slidesPerView;
    const lastVisibleIndex = activeIndex + slidesPerView - 1;

    if (clickedIndex === lastVisibleIndex) {
      this.slideNext();
    } else if (clickedIndex === activeIndex) {
      this.slidePrev();
    }
  });

  // Paris Negras (solo imagen, sin miniaturas)
  var mainSwiperParisNegras = new Swiper('#swiper-paris-negras', {
    loop: false,
    spaceBetween: 10,
    navigation: {
      nextEl: '#modeload-paris-negras .swiper-button-next',
      prevEl: '#modeload-paris-negras .swiper-button-prev',
    },
  });
});