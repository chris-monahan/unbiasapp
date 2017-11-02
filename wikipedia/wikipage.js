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
		return pronounLists;
	}

	my.getPronounDataAsArray = function(wrap){
		var pronounData = my.getPronounData();
		var array = $.map(pronounData, function(value, index) {
    	return [value];
		});
		console.log("Pronoun data as array");
		console.log(array);

		if(wrap === true){
			return {pronounCounts : array};
		} else {
			return array;
		}

	}

	return my;
}());
