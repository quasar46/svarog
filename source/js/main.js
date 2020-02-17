$(document).ready(function () {

  var switchBtns = document.querySelectorAll('.switch__btn');
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu');

  for (var i = 0; i < switchBtns.length; i++) {
    switchBtns[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      var active = document.querySelector('.switch__btn.active');
      if (active) {
        active.classList.remove('active');
      }
      this.classList.add('active');
    });
  }

  burger.addEventListener('click', function () {
    this.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('noscroll');
  });

  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
    dots: true,
  });

  $('.slider-nav').slick({
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3,
    dots: true,
    autoplay: false,
    asNavFor: '.slider-for',
    prevArrow: '<img src="../img/up.png" style="width: 17px; height: 49px; top:100px; position:absolute; cursor:pointer;">',
    nextArrow: '<img src="../img/down.png" style="width: 17px; height: 49px; bottom: 140px; position:absolute; cursor:pointer;">',
    responsive: [{
      breakpoint: 921,
      settings: {
        dots: false,
        slidesToShow: 1,
        vertical: false,
        prevArrow: '<img src="../img/up.png" style="width: 17px; height: 49px; position:absolute; cursor:pointer; transform:rotate(90deg); bottom:-50px; right:30%; z-index:20;">',
        nextArrow: '<img src="../img/down.png" style="width: 17px; height: 49px; position:absolute; cursor:pointer; transform:rotate(90deg); bottom:-50px; left:30%; z-index:20;">'
      }
    }]
  });
});