//La 1ère requete se fait lors du chargement de la page.
// Elle obtient le token qui permettra de faire la requete qui suit ( en cliquant le button.)

//Paramètres de la requete
let api_key = "key=AIzaSyChnjvA4bfCdWECZuaYcw38sF2pWHcrhdM" ;
//var base = "https://www.googleapis.com/youtube/v3/search?";
var base = 'https://www.googleapis.com/youtube/v3/playlistItems?';
var part = '&part=snippet';
//mot de recherche
var q = '&q=bitcoin';
//ID of playlist
var id = '&playlistId=PLkR3RWLcKJUQas7CJWD1jQXpRmDbPRVE0'

//Création de l'URL
var url = base + api_key + part +id;
//next page token
var token;

//1ère requête 
$.get( url, function( data ) {
	console.log('request launched with this url : '+ url);
	$("p").append('request launched with this url : <a href='+url+'>'+ 
		url+'</a>'+"<br>");
	console.log(data);

	//Obtenir token pour pouvoir charger la suite 
	token = data.nextPageToken

	console.log('next page token : '+ token);
	console.log('lenght of "item" array : '+ data.items.length)
	for (i = 0; i<data.items.length; i++){
		console.log(data.items[i].snippet.title);
		$("p").append(data.items[i].snippet.title + "<br>");
	}
});
//Requete délcenchée par le button
$("button").click(function(){

	if (token != undefined) {
//get next page with token
url = base + api_key +"&pageToken="+token+ part+id ;
console.log('new url :'+url)
$.get( url, function( data ) {
	console.log('request launched with this url : '+ url);
	$("p").append('request launched with this url : <a href='+url+'>'+ url+'</a>');
	console.log(data);
	token = data.nextPageToken

	console.log('next page token : '+ token);
	console.log('lenght of "item" array : '+ data.items.length)
	for (i = 0; i<data.items.length; i++){
		console.log(data.items[i].snippet.title);
		$("p").append(data.items[i].snippet.title + "<br>");

	}
});
} else {
	//sinon, executer ce code
	console.log('No token found : must be the last page.');


}

});
