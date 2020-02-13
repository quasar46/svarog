var switchBtns = document.querySelectorAll('.switch__btn');

for (var i = 0; i < switchBtns.length; i++) {
  switchBtns[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    var active = document.querySelector('.switch__btn.active');
    if (active) {
      active.classList.remove('active')
    }
    this.classList.add('active');
  });
}

$(document).ready(function () {
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  });

  $('.slider-nav').slick({
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3,
    dots: true,
    autoplay: false,
    asNavFor: '.slider-for',
    prevArrow: '<img src="../img/up.png" style="width: 17px; height: 49px; top:100px; position:absolute; cursor:pointer;">',
    nextArrow: '<img src="../img/down.png" style="width: 17px; height: 49px; bottom: 140px; position:absolute; cursor:pointer;">'
  });
});