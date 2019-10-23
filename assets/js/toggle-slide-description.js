const captionInactiveDesc = 'Show Description';
const captionActiveDesc = 'Hide Description';

function elHasClass( el, className ){
  let result = false;
  if( el.getAttribute( 'class' ).indexOf( className ) > -1 ){
    result = true;
  }
  return result;
}

function toggleClass( el, className ){

  if( elHasClass( el, className ) ){
    el.classList.remove( className );
  } else {
    el.classList.add( className );
  }

}

function syncDescriptionToggler( aToggler ){

  let sliderWrapper = aToggler.closest( '.page-main__projects' );
  let toggleButton = aToggler.querySelector( '.slider-show-desc__button' );

  if( sliderWrapper ){
    if( elHasClass( sliderWrapper, 'reveal-description' ) ){
      toggleButton.innerText = captionActiveDesc;
    } else {
      toggleButton.innerText = captionInactiveDesc;
    }
  }

}

function toggleDescriptionClick( aToggler ){
  let sliderWrapper = aToggler.closest( '.page-main__projects' );
  toggleClass( sliderWrapper , 'reveal-description' );
  syncDescriptionToggler( aToggler );
}

function assignTogglers(  ){
  let togglers = document.querySelectorAll( '.slider-show-desc' );
  togglers.forEach( ( aToggler ) => {
    aToggler.addEventListener( 'click', function(){
      toggleDescriptionClick( aToggler );
    } );
  } );
}

document.addEventListener( "DOMContentLoaded", assignTogglers );
