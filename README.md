#Feats Thru Sheets
An interactive, filterable, searchable database of people and events that can be reskinned for different types of stories and updated solely by reporters.
___


![alt text](https://s3-us-west-2.amazonaws.com/ibt-viz/feats_thru_sheets/img/template-pics/breakingnews-template.png "Screenshot of the People Database")

___



We've created a template connecting the front-end to a back-end Google Spreadsheet using [tabletop.js.](https://github.com/jsoma/tabletop) They can be customized by developers, and reporters can add content and images in a Google Spreadsheet and all changes will be reflected in real time. This is ideal for breaking news situations.

Reporters can also change titles, explainer text and credits. In addition, the database has a timestamp that chronicles the last time a reporter updated the database.

##### Check [out what it looks like](https://s3-us-west-2.amazonaws.com/ibt-viz/feats_thru_sheets/template/index.html)

##### ... Which is powered through [this Spreadsheet](https://docs.google.com/spreadsheets/d/1gTPFZQW-dudkakhyIBRZ6nxbW74WweGH7HOag2p_oDc/edit?usp=sharing)

There's also a filter button and search option for the readers that brings up certain data. The transitions were created using [Isotope.js.](http://isotope.metafizzy.co)


___


How we've used it and customized it:

+ [Paris attackers status](http://www.ibtimes.com/who-are-paris-terrorists-suspects-identified-plus-everything-we-know-2191815)

+ [Brexit World Leader Opinions](http://www.ibtimes.com/brexit-referendum-2016-amid-tight-polls-heres-who-wants-stay-who-wants-leave-among-2376752)

+ [Summer Concert Alternatives](http://www.ibtimes.com/beyonce-formation-tickets-too-expensive-here-are-cheaper-alternatives-summers-hottest-2368275)

+ [Victims of Mass Shootings](http://www.ibtimes.com/here-complete-list-every-person-killed-mass-shooting-2015-2243200)


___

###Skip to:


+ [Set it Up](#set-it-up)

+ [How Reporters Can Use It](#how-reporters-can-use-it)

+ [License](#license)


##Set it up

Create a new copy of [this Google Spreadsheet](https://docs.google.com/spreadsheets/d/1gTPFZQW-dudkakhyIBRZ6nxbW74WweGH7HOag2p_oDc/edit?usp=sharing) into your Google Drive. Then, go to the File menu and click on Publish to the web. Clicking on Start Publishing will make a URL like this appear:

```
https://docs.google.com/spreadsheets/d/1Jn4I3FIerKG5UGJSq3c3bEDs_V_9OxIGUnJ-Bu-3vEQ/pubhtml
```

Copy only the part between the `/d/` and the `/pubhtml`. In the example above, that would be:

```
1Jn4I3FIerKG5UGJSq3c3bEDs_V_9OxIGUnJ-Bu-3vEQ
```

Pick the template you'd like to use. Open up the js folder and find the init.js file.

Paste your Google Spreadsheet code to var public_spreadsheet_url. 

```javascript
var public_spreadsheet_url = '1Jn4I3FIerKG5UGJSq3c3bEDs_V_9OxIGUnJ-Bu-3vEQ';
```

**And that's it!** You've officially connected your Google Spreadsheet 

If you want to customize what shows up in the database or let it show other columns, you can customize it here within the same js file. This is the part where the resulting JSON fetched by tabletop is parsed into different divs which you can customize.

```javascript
$container.append('<div id="element-item"><div class="category">' + v.filtercategory + '</div><img src="' + v.piclink + '"><div class="name">' + v.title + '</div><div class="colorsubhed">' + v.subhed1 + '</div><div class="boldsubhed">' + v.subhed2 + '</div><div class="description">' + v.description + '</div><div class="boldsubhed">Nationality: ' + v.subhed3 + '</div><div class="readmore">Read <a href="' + v.link + ' " target="_blank">more</a></div></div>');

```

You can also change the filter button category by changing `v.filtercategory` to the category of your choice.

```javascript
 // Gets all unique filtercategory values and puts them into an array
            if ($.inArray(v.filtercategory, result) == -1) {

                result.push(v.filtercategory);

                // Creates the filter buttons

                $('#filter').append('<button id="' + v.filtercategory + '" class="btn btn-default" data-value="choice' + count++ + '">' + v.filtercategory + '</button>')

            }

```

You can also change what the style of the database looks like by changing the corresponding CSS or HTML file.

##How Reporters Can Use It

Share the Google Spreadsheet with your reporters. 

![alt text](https://s3-us-west-2.amazonaws.com/ibt-viz/feats_thru_sheets/img/template-pics/Google_Spreadsheet.png "Google Spreadsheet")

Let the reporters add new data to the Google Spreadsheet. Every column header corresponds to a section in the data.

For example this:

![alt text](https://s3-us-west-2.amazonaws.com/ibt-viz/feats_thru_sheets/img/template-pics/Google_spreadsheet2.png "Google Spreadsheet Sample")

Looks like this:

![alt text](https://s3-us-west-2.amazonaws.com/ibt-viz/feats_thru_sheets/img/template-pics/Sample_template.png "Sample Template")

The link that you put in the Google Spreadsheet will take you to that site by clicking "Read more" on the database.

**It's very important that you don't change the bold headers on the Google Spreadsheet columns** (unless you want to change the name of the headers, which in that case, you must also change the name of the headers in the corresponding js file)

####What about Pictures?

Every picture that you put on the database has to be uploaded to a server. Then add the link to the picture under the header "Pic_Link"

![alt text](https://s3-us-west-2.amazonaws.com/ibt-viz/feats_thru_sheets/img/template-pics/pic_link.png "Pic_Link example")


####Filter Categories

The header "Filter_category" in the Google Spreadsheet, highlighted in yellow, are the filter buttons at the top. You can create a new category by simply adding the new category to the "Filter category". Remember that adding too many categories will add too many buttons and won't look as good.

![alt text](https://s3-us-west-2.amazonaws.com/ibt-viz/feats_thru_sheets/img/template-pics/filter_category1.png "Filter Category Spreadsheet")

![alt text](https://s3-us-west-2.amazonaws.com/ibt-viz/feats_thru_sheets/img/template-pics/filter_category2.png "Filter Category: What it looks like")

#####How to Change the Headline

Go to bottom of the Google Spreadsheet and change the tab name. That will automatically change the headline.

![alt text](https://s3-us-west-2.amazonaws.com/ibt-viz/feats_thru_sheets/img/template-pics/headline_change.png "Change tab name at the bottom")

#####How to Change the Explainer and Credits

Go to bottom of the Google Spreadsheet and click on the tab called "Control". This will take you to a new spreadsheet where you can change what it says in the explainer and in the credits.

![alt text](https://s3-us-west-2.amazonaws.com/ibt-viz/feats_thru_sheets/img/template-pics/control_change.png "Change tab to the one called 'Control'")

![alt text](https://s3-us-west-2.amazonaws.com/ibt-viz/feats_thru_sheets/img/template-pics/credit_explainer_sheet.png "New explainer spreadsheet")

#####Now with Pym.js!

If you need to iframe in the database responsively, we now provide a [template](with-pym/) using pym.js. 

##License

This project is released under the terms specified in the [MIT license](https://tldrlegal.com/license/mit-license). 


