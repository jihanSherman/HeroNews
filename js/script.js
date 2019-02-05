function getSelectValue (){
    let selectedValue = document.getElementById("list").value;
    console.log(selectedValue);


//search Marvel Characters based on first letter of user input
var marvelCharacters = {
    render: function(){
        var api = "https://gateway.marvel.com/v1/public/characters?";
        var name = "name=" + document.getElementById("list").value;
        var apiKey = "&ts=1&apikey=e285bc28b3193e8141d6784bc6ebe42e&hash=818ebb62e190e72853672f3439619557";
        var urlMarvelCharacters = api + name + apiKey;
        var messageMarvelCharacters = document.getElementById("message-marvelCharacters");
        var footerMarvel = document.getElementById("footer-marvel");
        var charactersContainer = document.getElementById("characters-container");


       $.ajax ({
           url: urlMarvelCharacters,
           type: "GET",
           beforeSend: function(){
               messageMarvelCharacters.innerHTML = "Loading...";
           },
           complete: function(){
               messageMarvelCharacters.innerHTML = "";
           },
           success: function(data){
               footerMarvel.innerHTML = data.attributionHTML;
               var string = "";

               for(var i = 0; i<data.data.results.length;i++){
                   var element = data.data.results[i];

                   string += "<h3>" + element.name + "</h3>";
                   string += "<p>" + element.description + "</p>";
                   string += "<br/>";
                   string += "<a href='" + element.urls[0].url+ " ' target ='_blank'>";
                   string += "<img src='"+ element.thumbnail.path +"/portrait_fantastic."+element.thumbnail.extension+"' />";
                   string += "</a>";

                   if ((i+1) % 4 === 0) {
                   }
               }

               charactersContainer.innerHTML = string;
           },
           error: function(){
               messageMarvelCharacters.innerHTML = "We're sorry, there has been an error."
           }
       })
    }
};
marvelCharacters.render();


// search NYT based on keyword from user input
var nytSearch = {
    render: function () {
        var api = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
        var term = "q=" + document.getElementById("list").value;
        var apiKey = "&api-key=rmwfl4uwLrcsMbuOJeyxTXEarRgfS4BU";
        var urlNytSearch = api + term + apiKey;
        var messageNytSearch = document.getElementById("message-nytSearch");
        var footerNyt = document.getElementById("footer-nyt");
        var newsContainer = document.getElementById("news-container");

        $.ajax({
            url: urlNytSearch,
            type: "GET",
            beforeSend: function () {
                messageNytSearch.innerHTML = "Loading...";
            },
            complete: function () {
                messageNytSearch.innerHTML = "";
            },
            success: function (data) {
                footerNyt.innerHTML = data.copyright;
                var string = "";

                for(var i = 0; i<data.response.docs.length;i++){
                    var element = data.response.docs[i];

                    string += "<a href='" + element.web_url+ " 'target='_blank'>";
                    string += "<h3>" +element.headline.main + "</h3>";
                    string += "</a>";
                    string += "<p>" +element.snippet + "</p>";
                    string += "<br/>";

                    if ((i+1) % 4 === 0) {
                    }
                }

                newsContainer.innerHTML = string;
            },
            error: function () {
                messageNytSearch.innerHTML = "We're sorry, there has been an error."
            }
        })
    }
};
nytSearch.render();


}