(window).load(function() {

    var qsRegex;
    var buttonFilter;
    var $quicksearch = $('#quicksearch');
    var $container = $('#content')
    var timeout;


    Tabletop.init({
        key: '1Jn4I3FIerKG5UGJSq3c3bEDs_V_9OxIGUnJ-Bu-3vEQ',
        callback: getTable,
        simpleSheet: true
    })



    function getTable(data, tabletop) {
        $.each(data, function(i, v) {

            $('#content').append('<div class="element-item" data-category="transition"><div class="category">' + v.where + '</div><img src="' + v.piclink + '"><div class="name">' + v.name + '</div><div class="where">' + v.category + '</div><div class="head4">Age: ' + v.age + '</div><div class="description">' + v.description + '</div><div class="head4">Nationality: ' + v.nationality + '</div><div class="readmore">Read <a href="' + v.link + ' " target="_blank">more</a></div></div>');

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




        var filterFns = {

            choice1: function() {
                var name = $(this).find('.category').text();
                return name.match(/Stade de France$/);
            },
            choice2: function() {
                var name = $(this).find('.category').text();

                return name.match(/Bataclan concert hall$/) || name.match(/Bataclan Concert hall$/);
            },
            choice3: function() {
                var name = $(this).find('.category').text();
                return name.match(/Comptoir Voltaire Cafe$/) || name.match(/Comptoir Voltaire Cafe$/);
            },
            choice4: function() {
                var name = $(this).find('.category').text();
                return name.match(/Remains at large$/);
            },
            choice5: function() {
                var name = $(this).find('.category').text();
                return name.match(/Saint-Denis$/);
            }

        };
        // bind filter on select change
        $('#filter').on('click', 'button', function() {
            // get filter value from option value
            buttonFilter = $(this).attr('data-value');

            // use filterFn if matches value
            buttonFilter = filterFns[buttonFilter] || buttonFilter;
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
            $buttonGroup.on('click', 'button', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });


    };




});