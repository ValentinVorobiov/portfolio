let arrScrollers = document.querySelectorAll( '.scroller' );

let scrollPageDown = function(){

    let pageHeight = window.innerHeight;
    let docBody = document.body;
    let docHtml = document.documentElement;
    let docHeight = Math.max(
        docBody.scrollHeight,
        docBody.offsetHeight,
        docHtml.clientHeight,
        docHtml.scrollHeight
    );

    let currentPosition = Math.round( window.scrollY );

    let newPosition = currentPosition + pageHeight;
    if( newPosition < docHeight ){
      window.scrollTo( 0, newPosition );
    } else {
      window.scrollTo( 0, docHeight );
    }


}

arrScrollers.forEach( (anScroller) => {
  anScroller.addEventListener( "click" , scrollPageDown, { capture: true , passive: true,  } );
}  );


