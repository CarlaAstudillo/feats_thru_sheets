$(window).load(function() {

    var buttonFilter;
    var timeout;
    var $container = $('#content')

    var public_spreadsheet_url = '1Jn4I3FIerKG5UGJSq3c3bEDs_V_9OxIGUnJ-Bu-3vEQ';


    Tabletop.init({
        key: '11VkMkjE-bfwDxXB46cCBOgRJoKtyDUmkMQmX1SOkU18',
        callback: getTable,
        simpleSheet: true
    })


    function getTable(data, tabletop) {
        var result = [];
        var count = -1;
        $.each(data, function(i, v) {

            // Gets all unique filtercategory values and puts them into an array

            if ($.inArray(v.filtercategory, result) == -1) {

                count++

                result.push(v.filtercategory);

                // Creates the filter buttons


                $('#filter').append('<button type="button" class="btn btn-default filterbutton" style="background-color:' + v.categorycolor + ';" data-filter="' + v.filtercategory + '">' + v.filtercategory + "</button>")

            }

            // Parses the resulting JSON into individual squares and also uses if/then statements to call on either photosmall or photourl values



            $container.append('<div id="element-item" class="' + v.filtercategory + '"><div class="label" style="background-color:' + v.categorycolor + '" id="' + v.filtercategory + 'button">' + v.filtercategory + '</div><div id="name">' + v.person + '</div><p id="subhed">' + v.subhed + '</p><div>' + (v.photosmall ?
                '<img id="smallinlinephoto" src="' + v.photosmall + '">' :
                '<img id="inlinephoto" src="' + v.photourl + '">'
            ) + (v.photocredit ?
                '<p id="caption">' + v.photocredit + '</p>' :
                ''
            ) + '</div>' + v.profileparagraph + (v.twitter ?
                '<p id="twitter"><strong>Follow them on twitter:</strong> <a href="https://twitter.com/' + v.twitter + '" target="_blank">' + v.twitter + '</a>' :
                ''
            ) + (v.twitter2 ?
                ', <a href="https://twitter.com/' + v.twitter2 + '" target="_blank">' + v.twitter2 + '</a>' :
                ''
            ) + (v.twitter3 ?
                ', <a href="https://twitter.com/' + v.twitter3 + '" target="_blank">' + v.twitter3 + '</a>' :
                ''
            ) + '</p></div>');




        });


        $container.imagesLoaded(function() {

            $container.isotope({
                itemSelector: '#element-item',
                layoutMode: 'masonry'

            });
        });



        $('#filter').on('click', 'button', function() {
            // get filter value from the clicked button
            buttonFilter = $(this).attr('data-filter');
            // calls matching Isotope.js
            if (buttonFilter != "*") {

                $container.isotope({
                    filter: '.' + buttonFilter
                });


            } else {
                $container.isotope({
                    filter: '*'
                });
            }



        });


        function debounce(fn, threshold) {

            return function debounced() {
                if (timeout) {
                    clearTimeout(timeout);
                }

                function delayed() {
                    fn();
                    timeout = null;
                }
                timeout = setTimeout(delayed, threshold || 100);
            }
        }

    }


});