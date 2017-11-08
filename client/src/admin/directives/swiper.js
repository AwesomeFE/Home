// https://github.com/nolimits4web/Swiper/issues/2206#issuecomment-330068581
import Swiper from 'swiper/dist/js/swiper.js'

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