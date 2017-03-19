/*
GA SF JSD6
Jac Stewart
*/

var config = require('./config.json');
console.log(config.api_key);

// Check that DOM tree has loaded
$( document ).ready(function () {

// Call News API
  // Define request variables for Hacker News
  var api_key = 'fc21c0fe480a415c9fc30d8b0b6ca448';
  var source = 'hacker-news';
  var sortBy = 'top';
  var requestEndpoint = 'https://newsapi.org/v1/articles?';
  var requestUrl = (requestEndpoint + '&apiKey=' + api_key + '&source=' + source + '&sortBy=' + sortBy);
  var defaultImageUrl = 'https://news.ycombinator.com/favicon.ico';

  // Make HTTP request
  function httpGet(endpointURL) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var responseObject = JSON.parse(xmlHttp.response)
            // console.log(responseObject);
            responseObject.articles.forEach(function (article) {
                var newArticle = document.createElement('article')
                newArticle.className = 'article';

                var newArticleImageContainer = document.createElement('section')
                newArticleImageContainer.className = 'featuredImage';
                var newArticleImage = document.createElement('img');
                if (article.urlToImage !== null) {
                        newArticleImage.setAttribute('src', article.urlToImage);
                      }
                else {
                        newArticleImage.setAttribute('src', defaultImageUrl);
                }
                newArticleImageContainer.appendChild(newArticleImage);

                var newArticleContent = document.createElement('section')
                newArticleContent.className = 'articleContent';
                var newArticleLink = document.createElement('a')
                newArticleLink.setAttribute('href', article.URL);
                var newArticleTitleContainer = document.createElement('h3');
                var newArticleTitle = document.createTextNode(article.title);
                newArticleTitleContainer.appendChild(newArticleTitle);
                newArticleLink.appendChild(newArticleTitleContainer);
                newArticleContent.appendChild(newArticleLink);

                var newArticleImpressionsCount = document.createElement('section');
                newArticleImpressionsCount.className = 'impressions';
                var newArticleClearfix = document.createElement('div');
                newArticleClearfix.className = 'clearfix';

                newArticle.appendChild(newArticleImageContainer);
                newArticle.appendChild(newArticleContent);
                newArticle.appendChild(newArticleImpressionsCount);
                newArticle.appendChild(newArticleClearfix);

                var articleContainer = document.getElementById('main');
                articleContainer.appendChild(newArticle);
            });
          }
    }
    xmlHttp.open("GET", endpointURL, true);
    xmlHttp.send(null);
  };
  httpGet(requestUrl);

// While API call is running, display loading popUp


// Once API call is complete display results


/* Add an error message (either alert or a notification on the page) if the app
cannot load from the selected feed. */

// When user selects article title, show #popUp` overlay

/*
When the user selects a source from the dropdown menu on the header, replace
the content of the page with articles from the newly selected source. Display
the loading pop up when the user first selects the new source, and hide it on
success.
*/

});
