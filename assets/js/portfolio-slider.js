

const desktop_options = {
  // container: '#base',
  controls: true,
  items: 1,
  loop: true,
  slideBy: 'page',
  mouseDrag: true,
  autoplayTimeout: 7500,
  speed: 400,
  swipeAngle : false,
}

let sliders = document.body.querySelectorAll( '.slider' );

for( let i = 0; i < sliders.length; i++ ){
  let currentSlider = sliders[ i ];
  currentSlider = tns( desktop_options );
}
