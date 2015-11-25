$(window).load(function(){
      var public_spreadsheet_url ='1ICer6JACg1dyo-5bOdShqDQWI-yz4XK70wVJEavkLBY';

      $(document).ready( function() {
        Tabletop.init( { key: public_spreadsheet_url,
                         simplesheet: true,
                         callback: showInfo,
                         orderby: "order",
                         parseNumbers: true } );
      });
        
      function showInfo(data, tabletop) {
        var source   = $("#420template").html();
        var template = Handlebars.compile(source);

        $.each( tabletop.sheets("top20").all(), function(i, fest) {
          var html = template(fest);
          $("#content").append(html);
        });
      }



      /* top photo toggles */

    $(function() {
         $('#allbutton').click(function(e){ e.preventDefault();
        $('#content').isotope({ filter:'*' });
      });
      $('#Advocacybutton').click(function(e){ e.preventDefault();
        $('#content').isotope({ filter: '.Advocacy' });
      });
      $('#Businessbutton').click(function(e){ e.preventDefault();
        $('#content').isotope({ filter: '.Business' });
      });
      $('#Researchbutton').click(function(e){ e.preventDefault();
        $('#content').isotope({ filter: '.Research' });
      });
      
    });

      });

