
const formWrapperSelector = ".app-form-wrapper";

let appFormCallAdd = ( buttonElement ) => {
  let appForm = document.querySelector( ".page-header-main" ).querySelector( formWrapperSelector );
  buttonElement.addEventListener(
    "click",
    appFormShow,
    { capture: true , passive: true, }
    );
}

let appFormShow = (  )=> {
  let appForm = document.querySelector( ".page-header-main" ).querySelector( formWrapperSelector );

  let isVisible = appForm.classList.contains( 'active' );
  if( ! isVisible ){
    appForm.classList.add( 'active' );
  }
}

let appFormHide = () => {
  let appForm = document.querySelector( ".page-header-main" ).querySelector( formWrapperSelector );
  let isVisible = appForm.classList.contains( 'active' );
  if( isVisible ){
    appForm.classList.remove( 'active' );
  }
}

let formCallButtons = document.querySelector( ".page-header-main" ).querySelectorAll( ".header-main-button" );

formCallButtons.forEach( (aButton) => {
  appFormCallAdd( aButton );
} );

let appFormWrapper = document.querySelector( ".page-header-main" ).querySelector( '.app-form-wrapper' );


appFormWrapper.addEventListener(
  "click",
  ( event )=>{
    let eventTarget = event.target;
    if(
      eventTarget.classList.contains( 'app-form-wrapper' ) ||
      eventTarget.classList.contains( 'app-form-close' ) ||
      eventTarget.classList.contains( 'form-close-glyph' ) ||
      eventTarget.classList.contains( 'app-form-submit-button' )
    ){
      appFormHide();
    }

  },
  { capture: true , passive: true, }
  );


