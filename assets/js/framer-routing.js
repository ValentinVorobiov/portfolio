 /* Thanks to https://medium.com/@bryanmanuele/how-i-implemented-my-own-spa-routing-system-in-vanilla-js-49942e3c4573  */



let routes = [
  { name : 'Home', iPath : '/', realPath : './portfolio.html', } ,
  { name : 'TheyAlow Project', iPath : '/projects/theyalow/', realPath : './projects/theyalow/index.html', } ,
  { name : 'Repair Design Project', iPath : './projects/repair-design-project/', realPath : './projects/repair-design-project/index.html', } ,
]

const findRoute = function( aString ){
  let routeIndex = -1;
  routes.forEach( (route, index) => {
    if( route.realPath == aString ){
      routeIndex = index;
    } else if( route.iPath == aString ){
      routeIndex = index ;
    } else if( route.name.toLowerCase() == aString.toLowerCase() ){
      routeIndex = index ;
    }
  } ) ;
  return routeIndex;
}


let targetFrame = document.body.querySelector( "iframe.content-target" );
let targetSource = targetFrame.getAttribute( 'src' );
let myHistory = [];

// Checking whether iframe src attribute is empty

if( ! targetFrame.getAttribute( 'src' ).length ){

    targetFrame.setAttribute( 'src' , routes[ 0 ].realPath );
    window.history.pushState( routes[0] , routes[0].name, window.location.origin );
    myHistory.push( routes[0] );

}



targetFrame.onload = function(  ){
  // Doing REALLY BAAAAAD things to router links in child docs...
  // Like preventing default event for router links
  let frameDocument = targetFrame.contentWindow.document ;
  //    to renew frame contents use
  //    targetFrame.location.reload( true );
  let routerLinks = frameDocument.querySelectorAll( '.router-link' );

    for( let i=0; i<routerLinks.length; i++ ){
    routerLinks[ i ].addEventListener( 'click', ( event ) => {
      event.preventDefault();
      let targetURI = event.target.getAttribute( 'href' );
      let routeIndex = findRoute( targetURI );
      if( routeIndex > -1 ){
        let route = routes[ routeIndex ];
        targetFrame.setAttribute( 'src', route.realPath );
        window.history.pushState( route, route.name, window.location.origin );
        myHistory.push( route );
      }

    } );
  }

}

let backHistoryButtons = document.body.querySelectorAll( '.toolbar__button--back' );
backHistoryButtons.forEach( ( button ) => {
  button.addEventListener( 'click', (  ) => {
    if( myHistory.length > 1 ){
      myHistory.pop();
      let newPath = myHistory[ myHistory.length - 1 ].realPath;
      targetFrame.setAttribute( 'src', newPath );
    }
  } );

} );

let checkTogglerButton = function( button ){
  let togglerButton = button || document.body.querySelector( '.toolbar__button--res-toggler' );
  let contentWrapper = document.body.querySelector( '.framer-content-wrapper' );
  let windowWidth = window.innerWidth;
  let isPureMobile = windowWidth < 391;
  let isMobileWrapped = contentWrapper.clientWidth < 391 || contentWrapper.classList.contains( 'mobile' );
  if( isPureMobile ){
    togglerButton.style.display = 'none' ;
  } else {
    togglerButton.style.display = 'inline-block' ;
  }

  if( isMobileWrapped && !isPureMobile ){
    togglerButton.innerHTML = 'Desktop' ;
  } else if( !isPureMobile ){
    togglerButton.innerHTML = 'Mobile';
  }

}

document.body.querySelectorAll( '.toolbar__button--res-toggler' )
  .forEach( ( button ) =>{
    button.addEventListener( 'click', function( event ){
      toggleContentWrapper( event.target );
    } );
  } );


let toggleContentWrapper = function( aButton ){
  let contentWrapper = document.body.querySelector( '.framer-content-wrapper' );
  let togglerButton = aButton || document.body.querySelector( '.toolbar__button--res-toggler' );
  let windowWidth = window.innerWidth;
  let isPureMobile = windowWidth < 391;
  let isMobileWrapped = contentWrapper.clientWidth < 391 || contentWrapper.classList.contains( 'mobile' );

  if( isMobileWrapped ){
    contentWrapper.classList.remove( 'mobile' );
  } else {
    contentWrapper.classList.add( 'mobile' );
  }

  checkTogglerButton();

}

let resizeTimer = null;

window.addEventListener( 'onresize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(
    () => {
      checkTogglerButton();
    },
    350
  );
} );


