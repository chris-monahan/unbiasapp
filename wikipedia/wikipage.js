wikiPage = (function () {
	var my = {};

  var pronounLists = {
    0:{
      identifier:"she",
      terms:["she","her","hers","herself"],
      count:0
    },
    1:{
      identifier:"he",
      terms:["he","him","his","himself","himselves"],
      count:0
    },
    2:{
      identifier:"they",
      terms:["them","their","theirs","themselves","themself"],
      count:0
    },
    3:{
      identifier:"ze/zie",
      terms:["ze","zie","hir","hir","hirs","hirself"],
      count:0
    }
  }

  my.getWikiBodyText = function(){
    $wikiBody = $("#bodyContent");
    return $wikiBody.text();
  }

  my.searchByList = function(searchList){
    var wikiBody = my.getWikiBodyText();

    var foundCount = 0;

    $.each(searchList, function(key, value){
      //console.log("Searching for: " + value);
      var regEx = new RegExp("\\b" + value + "\\b", "g");
      //console.log(regEx);

      var thisMatch = wikiBody.match(regEx);
      if(thisMatch !== null){
        //console.log(thisMatch);
        foundCount = foundCount + thisMatch.length;
      }

    });
    //console.log("Final found count is" + foundCount);
    return foundCount;
  }

  my.searchPronouns = function(){
    $.each(pronounLists, function(key, value){
       thisList = value;
       //console.log("Searching for "+thisList.identifier+" pronouns");

       thisList.count = my.searchByList(thisList.terms);
       //console.log(thisList);
    });
  }

	my.getPronounData = function(){
		my.searchPronouns();

		var pronounData = pronounLists;
		var totalCount = 0;

		$.each(pronounData, function(key, value){
			value.count = parseInt(value.count);
			totalCount = totalCount + value.count;
		});

		$.each(pronounData, function(key, value){
			//console.log("Adding percentage");
			//console.log(value);
			//console.log(totalCount);

			if(totalCount !== 0){
				value.fullPercentage = (value.count / totalCount) * 100;
				value.percentage = Math.round(value.fullPercentage * 100) / 100

			} else {
				value.fullPercentage = 0;
				value.percentage = 0;
			}


			//console.log("percentage added");
			//console.log(value);
		});



		return pronounData;
	}

	my.getPronounDataAsArray = function(wrap){
		var pronounData = my.getPronounData();
		var total = 0;
		for (var i=0; i<pronounData.length; i++){
			total = total + pronounData[i];
		}

		var array = $.map(pronounData, function(value, index) {
			//console.log(pronounData["count"]);
//			return [Math.round(value*total/100)];
			return[value];
		});
		console.log("Pronoun data as array");


		if(wrap === true){
			return {pronounCounts : array};
		} else {
			return array;
		}

	}

	return my;
}());
