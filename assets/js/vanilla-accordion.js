let accordions = document.getElementsByClassName( 'accordion' );

    for( let i=0; i<accordions.length; i++ ){
        let currentAccordion = accordions[ i ] ;
        let accordionToggler = currentAccordion.querySelector( '.accordion-toggler' );

        accordionToggler.addEventListener( 'click' , function() {
            let accordionData = currentAccordion.querySelector( '.accordion-contents' );
            // this.classList.toggle( 'active' );
            currentAccordion.classList.toggle( 'active' );

        } );
    }
