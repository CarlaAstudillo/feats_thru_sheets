$(window).load(function() {

    var qsRegex;
    var buttonFilter;
    var $quicksearch = $('#quicksearch');
    var $container = $('#content')
    var timeout;
    var filterFns;


    Tabletop.init({
        key: '1Jn4I3FIerKG5UGJSq3c3bEDs_V_9OxIGUnJ-Bu-3vEQ',
        callback: getTable,
        simpleSheet: true
    })


    function getTable(data, tabletop) {
        var result = [];
        var count = 1;
        $.each(data, function(i, v) {

            $('#content').append('<div class="element-item"><div class="category">' + v.filtercategory + '</div><img src="' + v.piclink + '"><div class="name">' + v.title + '</div><div class="where">' + v.subhead1 + '</div><div class="head4">Age: ' + v.subhead2 + '</div><div class="description">' + v.description + '</div><div class="head4">Nationality: ' + v.subhead3 + '</div><div class="readmore">Read <a href="' + v.link + ' " target="_blank">more</a></div></div>');

            if ($.inArray(v.filtercategory, result) == -1) {

                result.push(v.filtercategory);

                $('#filter').append('<button id="' + v.filtercategory + '" class="btn btn-default" data-value="choice' + count++ + '">' + v.filtercategory + '</button>')

            }


        });


        $quicksearch.keyup(debounce(function() {
            qsRegex = new RegExp($quicksearch.val(), 'gi');
            $container.isotope();
        }));



        $container.imagesLoaded(function() {

            $container.isotope({
                itemSelector: '.element-item',
                layoutMode: 'masonry',
                filter: function() {
                    var $this = $(this);
                    var searchResult = qsRegex ? $this.text().match(qsRegex) : true;

                    var buttonResult = buttonFilter ? $this.is(buttonFilter) : true;

                    return searchResult && buttonResult;

                }

            });
        });



        // bind filter on select change
        $('#filter').on('click', 'button', function() {
            // get filter value from option value
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


        $('.btn-group').each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            var allbuttonids = $("button").attr('id');
            $buttonGroup.on('click', 'button', function() {

                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });


    };

});