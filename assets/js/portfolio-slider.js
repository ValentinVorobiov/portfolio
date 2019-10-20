

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

console.log( 'Initializing TinySliders...' );

for( let i = 0; i < sliders.length; i++ ){
  console.log( 'trying to make slider #', i+1  );
  let currentSlider = sliders[ i ];
  console.log( 'slider box BEFORE: \n', sliders[ i ] );
  currentSlider = tns( desktop_options );
  console.log( 'slider box AFTER: \n', currentSlider );

}
