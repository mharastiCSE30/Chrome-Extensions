/* Chrome Tool Kit Extension
 * Created By: Michael Harasti
 *
 */

//Used to determine if a new tab or window should be opened
option = false;

//Function to check if the given input contains only alphabet characters.
//Used for the dictionary and thesarus searches
var validate = function(data){

	//Regular expression to test for
	if(/^[a-zA-Z]+$/.test(data)){
		return true;	
	}
	return false;
}

//General function that holds the event handling functions inside
$(function(){


	//Updates text messages when dictionary button is clicked
	$(".Dic").click(function(){

		$("#text").text("Dictionary Search:");
		$("#error").text("");
	});


	//Updates text messages when thesarus button is clicked
	$(".Thes").click(function(){

		$("#text").text("Thesarus Search:");
		$("#error").text("");

	});


	//Updates text messages when google translate button is clicked
	$(".Tran").click(function(){

		$("#text").text("Google Translate Search:");
		$("#error").text("");

	});

	//Updates text messages when YouTube button is clicked
	$(".You").click(function(){


		$("#text").text("YouTube Search:");
		$("#error").text("");
	});

	//Updates text messages when Amazon button is clicked
	$(".Ama").click(function(){

		$("#text").text("Amazon Search:");
		$("#error").text("");
	});

	//Creates toggling event when new tab and window buttons are clicked
	//Sets option variable correctly and colors them correctly also
	$("#tab").click(function(){
		$("#tab").css("background-color", "lightslategray");
		$("#window").css("background-color", "lightgray");
		option=false;
		$("#error").text("");
	});
	$("#window").click(function(){
		$("#tab").css("background-color", "lightgray");
		$("#window").css("background-color", "lightslategray");
		option=true;
		$("#error").text("");

	});

	//Variable holding the function to either generate the new tab or window depending on user input
	var generate = function(event) {
		//Gets the user input
		var data = $("#words").val();

		//If the data is not empty
		if(data != ""){

			//Creates urls for all possible options the extension supports
			var dictionary = "http://www.dictionary.com/browse/"+data +"?s=t";
			var thesarus = "http://www.thesarus.com/browse/"+data+"?s=t";
			var translate = "https://translate.google.com/#auto/en/"+data;
			var youtube = "https://www.youtube.com/results?search_query="+data;
			var amazon = "https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords="+data;

			//For dictionary searches
			if($("#text").text() === "Dictionary Search:" ){
			       	//Deletes error message	
				$("#error").text("");

				//If the user entered valid data(alphabet characters only
				if(validate(data)){	
					//Creates new window data and window where url points to
					if(option){
						var make = {
							"url": dictionary,
							"type":"popup",
							"top":15,
							"left":15,
							"width":Math.round(screen.availWidth/1.5),
							"height": Math.round(screen.availHeight/1.5)
						};
						chrome.windows.create(make,function(){});
					}
					//Creates new tab
					else{
						chrome.tabs.create({ url: dictionary });
					}
				}
				//Prints error message and empties input
				else{

					$("#error").text("Please only input alphabet characters (no punctuation,numbers,etc.)");
					$("#words").val("");
				}

			}

			//For thesarus searches
			if($("#text").text() === "Thesarus Search:" ){ 
				//Delete error message
				$("#error").text("");

				//Again validates the user's data for alphabet only characters
				if(validate(data)){
					//Creates new window data and new window for url 
					if(option){
						var make = {
							"url": thesarus,
							"type":"popup",
							"top":15,
							"left":15,
							"width":Math.round(screen.availWidth/1.5),
							"height": Math.round(screen.availHeight/1.5)
						};
						chrome.windows.create(make,function(){});
					}
					//Creates new tab
					else{
						chrome.tabs.create({ url: thesarus });

					}
				}
				//Error message and empties input
				else{

					$("#error").text("Please only input alphabet characters (no punctuation,numbers,etc.)");
					$("#words").val("");
				}
			}


			//For google translate searches
			if($("#text").text() === "Google Translate Search:"){ 

				//Creates window data and window itself
				if(option){
					var make = {
						"url": translate,
						"type":"popup",
						"top":15,
						"left":15,
						"width":Math.round(screen.availWidth/1.5),
						"height": Math.round(screen.availHeight/1.5)
					};
					chrome.windows.create(make,function(){});
				}
				//Creates new tab
				else{
					chrome.tabs.create({ url: translate });
				}				

			}

			//For YouTube searching
			if($("#text").text() === "YouTube Search:"){ 

				//Creates window data and new window itself
				if(option){
					var make = {
						"url": youtube,
						"type":"popup",
						"top":15,
						"left":15,
						"width":Math.round(screen.availWidth/1.5),
						"height": Math.round(screen.availHeight/1.5)
					};
					chrome.windows.create(make,function(){});
				}
				//Creates new tab
				else{
					chrome.tabs.create({ url: youtube });
				}

			}


			//For Amazon searching
			if($("#text").text() === "Amazon Search:"){ 

				//Creates window data and window itself
				if(option){
					var make = {
						"url": amazon,
						"type":"popup",
						"top":15,
						"left":15,
						"width":Math.round(screen.availWidth/1.5),
						"height": Math.round(screen.availHeight/1.5)
					};
					chrome.windows.create(make,function(){});
				}
				//Creates new tab
				else{
					chrome.tabs.create({ url: amazon });
				}

			}
		}
	}

	//Calls the generate variable with its respective events on a button click or by clicking enter on the keyboard when the input bar has been clicked on.
	$("#wordChoice").on("click",generate);	
	$("input").keypress(function(event){	

		if(event.which == 13){

			generate(event);
		}
	});

});



