$(window).load(function(){

      


                   $.each(json, function (i, v) {
             $('#content').append('<div class="element-item" data-category="transition"><div class="category">'+v.Where+'</div><img src="' + v.Pic_Link + '"><div class="name">'+v.Name+'</div><div class="where">'+ v.Category +'</div><div class="head4">Age: ' + v.Age + '</div><div class="description">' + v.Description + '</div><div class="head4">Nationality: '+ v.Nationality +'</div><div class="readmore">Read <a href="'+ v.Link +' " target="_blank">more</a></div></div>');




             
         });

                   

                  
                  
var qsRegex;
var buttonFilter;

  var $quicksearch = $('#quicksearch').keyup( debounce( function() {
        qsRegex = new RegExp( $quicksearch.val(), 'gi' );
        $container.isotope();
      }) );
                 

       var $container = $('#content')
       $container.imagesLoaded( function() {        

                $container.isotope({
    itemSelector: '.element-item',
    layoutMode: 'masonry',
    filter: function() {
      var $this = $(this);
      var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
      var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
      return searchResult && buttonResult;
    }
    

  });
                 });


                
  

  

  var filterFns = {

    choice1: function() {
      var name = $(this).find('.category').text();
      return name.match( /Stade de France$/ );
    },
    choice2: function() {
      var name = $(this).find('.category').text();

      return name.match( /Bataclan concert hall$/ ) || name.match( /Bataclan Concert hall$/ );
    },
    choice3: function() {
      var name = $(this).find('.category').text();
      return name.match( /Comptoir Voltaire Cafe$/ ) || name.match( /Comptoir Voltaire Cafe$/ );
    },
    choice4: function() {
      var name = $(this).find('.category').text();
      return name.match( /Remains at large$/ );
    },
    choice5: function() {
      var name = $(this).find('.category').text();
      return name.match( /Saint-Denis$/ );
    }

  };
  // bind filter on select change
  $('#sorts').on( 'click', 'button', function() {
    // get filter value from option value
    buttonFilter = $(this).attr('data-value');
  
    // use filterFn if matches value
    buttonFilter = filterFns[ buttonFilter ] || buttonFilter;
    $container.isotope();
  });




function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    timeout = setTimeout( delayed, threshold || 100 );
  }
}


  $('.btn-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });
               

       
 
  
});