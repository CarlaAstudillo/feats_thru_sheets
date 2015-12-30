$(window).load(function() {

    var buttonFilter;
    var timeout;
    var $container = $('#database')

    var public_spreadsheet_url = '1ZDt9riqDhXTahTgMrvSqarU_XL0bJb2Owd43NKGd97c';

    var timestampdata = "https://spreadsheets.google.com/feeds/cells/" + public_spreadsheet_url + "/od6/public/basic?alt=json"
 // Call the Google Spreadsheet as a regular JSON to get latest timestamp which is not included in Tabletop.js
$.ajax({
    url:timestampdata,
    dataType:"jsonp",
    success:function(data) {
        // Get timestamp and parse it to readable format

        
        var date = data.feed.updated.$t

        var MM = {Jan:"Jan.", Feb:"Feb.", Mar:"March", Apr:"April", May:"May", Jun:"June", Jul:"July", Aug:"Aug.", Sep:"Sept.", Oct:"Oct.", Nov:"Nov.", Dec:"Dec."}

var formatdate = String(new Date(date)).replace(
    /\w{3} (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):[^(]+\(([A-Z]{3})\)/,
    function($0,$1,$2,$3,$4,$5,$6){
        return MM[$1]+" "+$2+", "+$3+" at "+$4%12+":"+$5+(+$4>12?"PM":"AM")+" "+$6 
    }
)


        $('#updated').append("Last updated " + formatdate)
    },
});


    Tabletop.init({
        key: public_spreadsheet_url,
        callback: getTable,
        simpleSheet: true
    })


    function getTable(data, tabletop) {
        var sheetname = tabletop.foundSheetNames[0];
        var sheetnamecontrol = tabletop.foundSheetNames[1];

        // Get title of datasheet

        var title = sheetname; 
        $("h2").append(title)

        // Get credits and explainer from "Control spreadsheet"

        $.each(tabletop.sheets(sheetnamecontrol).all(), function(i, v) {
      
          var explainer = v.explainer
          var credits = v.credits
          $("#credits").append(credits)
          $(".explainer").append(explainer)
        });

        var result = [];
        var count = -1;
        $.each(tabletop.sheets(sheetname).all(), function(i, v) {

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