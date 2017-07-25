import Swiper from 'swiper'

export default {
  inserted(el) {
    new Swiper(el, {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      autoplay: 1000,
      autoplayDisableOnInteraction: false,
      loop : true
    })
  }
}