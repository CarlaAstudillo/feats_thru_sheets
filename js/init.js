$(window).load(function() {

    var qsRegex;
    var buttonFilter;
    var $quicksearch = $('#quicksearch');
    var $container = $('#content')
    var timeout;

    var timestampdata = "https://spreadsheets.google.com/feeds/cells/1Jn4I3FIerKG5UGJSq3c3bEDs_V_9OxIGUnJ-Bu-3vEQ/od6/public/basic?alt=json"



    var public_spreadsheet_url = '1Jn4I3FIerKG5UGJSq3c3bEDs_V_9OxIGUnJ-Bu-3vEQ';

    $.ajax({
    url:timestampdata,
    dataType:"jsonp",
    success:function(data) {
        console.log(data.feed.updated.$t)

        var date = new Date(data.feed.updated.$t)
        //date 2015-11-30T22:53:34.109Z
        $('.updated').append("Last updated " + date)
        // data.feed.entry is an array of objects that represent each cell

    },
});



    // Tabletop initialization

    Tabletop.init({
        key: public_spreadsheet_url,
        callback: getTable,
        simpleSheet: true
    })

    // Function that fetches the Google Spreadsheet


    function getTable(data, tabletop) {

        var result = [];
        var count = 1;


        $.each(data, function(i, v) {


            // Parses the resulting JSON into individual squares

            $container.append('<div id="element-item"><div class="category">' + v.filtercategory + '</div><img src="' + v.piclink + '"><div class="name">' + v.title + '</div><div class="colorsubhed">' + v.subhed1 + '</div><div class="boldsubhed">Age: ' + v.subhed2 + '</div><div class="description">' + v.description + '</div><div class="boldsubhed">Nationality: ' + v.subhed3 + '</div><div class="readmore">Read <a href="' + v.link + ' " target="_blank">more</a></div></div>');


            // Gets all unique filtercategory values and puts them into an array
            if ($.inArray(v.filtercategory, result) == -1) {

                result.push(v.filtercategory);

                // Creates the filter buttons

                $('#filter').append('<button id="' + v.filtercategory + '" class="btn btn-default" data-value="choice' + count++ + '">' + v.filtercategory + '</button>')

            }


        });

        // Adds the search function


        $quicksearch.keyup(debounce(function() {
            qsRegex = new RegExp($quicksearch.val(), 'gi');
            $container.isotope();
        }));


        // Sorts them into responsive square layout using isotope.js
        $container.imagesLoaded(function() {

            $container.isotope({
                itemSelector: '#element-item',
                layoutMode: 'masonry',
                // so that isotope will filter both search and filter results
                filter: function() {
                    var $this = $(this);
                    var searchResult = qsRegex ? $this.text().match(qsRegex) : true;

                    var buttonResult = buttonFilter ? $this.is(buttonFilter) : true;

                    return searchResult && buttonResult;

                }

            });
        });



        // debounce so filtering doesn't happen every millisecond
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

        // Adds a click function to all buttons in the group

        $('.btn-group').each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            var allbuttonids = $("button").attr('id');
            $buttonGroup.on('click', 'button', function() {

                // Changes to .is-checked class when clicked

                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');

                // Gets all values that matches the clicked button's data value

                buttonFilter = $(this).attr('data-value');
                textFilter = $(this).text();


                function getitems() {
                    var name = $(this).find('.category').text();

                    if (textFilter != "Show All") {
                        return name.match(textFilter);

                    } else {
                        return "*";
                    }

                }

                buttonFilter = getitems || buttonFilter;

                $container.isotope();


            });
        });


    };

});