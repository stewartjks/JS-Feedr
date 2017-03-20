/*
GA SF JSD6
Jac Stewart
*/

// Make HTTP request
function httpGet(source, defaultImageUrl) {
  // Define global request variables
  var api_key = '';
  var sortBy = 'top';
  var requestEndpoint = 'https://newsapi.org/v1/articles?';

  // Open request
  var xmlHttp = new XMLHttpRequest();
  var requestUrl = (requestEndpoint + '&apiKey=' + api_key + '&source=' + source + '&sortBy=' + sortBy);

  xmlHttp.onreadystatechange = function() {
  // Once API call is complete, display results
    if (xmlHttp.readyState < 4) {
        document.getElementById('popUp').className = 'loader';
    }
    else if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        // Hide loader animation
        document.getElementById('popUp').className = 'loader hidden';

        // Iterate over set of articles received
        var responseObject = JSON.parse(xmlHttp.response);
        responseObject.articles.forEach(function (article) {
            var newArticle = document.createElement('article');
            newArticle.className = 'article';

            // Create image container for article
            var newArticleImageContainer = document.createElement('section');
            newArticleImageContainer.className = 'featuredImage';
            var newArticleImage = document.createElement('img');
            if (article.urlToImage !== null ) {
              newArticleImage.setAttribute('src', article.urlToImage);
            }
            else {
              newArticleImage.setAttribute('src', defaultImageUrl);
            }
            newArticleImageContainer.appendChild(newArticleImage);

            // Create content container for article
            var newArticleContent = document.createElement('section');
            newArticleContent.className = 'articleContent';
            var newArticleLink = document.createElement('a');
            newArticleLink.className = 'articleLink';
            newArticleLink.setAttribute('href', article.url);
            var newArticleTitleContainer = document.createElement('h3');
            var newArticleTitle = document.createTextNode(article.title);
            newArticleTitleContainer.appendChild(newArticleTitle);
            newArticleLink.appendChild(newArticleTitleContainer);
            newArticleContent.appendChild(newArticleLink);

            // Create impressions counter for article
            var newArticleImpressionsCount = document.createElement('section');
            newArticleImpressionsCount.className = 'impressions';
            var newArticleClearfix = document.createElement('div');
            newArticleClearfix.className = 'clearfix';

            // Append components to new article
            newArticle.appendChild(newArticleImageContainer);
            newArticle.appendChild(newArticleContent);
            newArticle.appendChild(newArticleImpressionsCount);
            newArticle.appendChild(newArticleClearfix);

            // Append new article to 'main' content container
            var articleContainer = document.getElementById('main');
            articleContainer.appendChild(newArticle);
        });
      }
      // Add an error message (either alert or a notification on the page) if the app cannot load from the selected feed.
      else if (xmlHttp.readyState === 4 && xmlHttp.status !== 200) {
        // Hide loader animation
        document.getElementById('popUp').className = 'loader hidden';
        // Alert user of error
        alert('Sorry, this news source is temporarily unavailable. Please try another one.');
      }
  }
  xmlHttp.open("GET", requestUrl, true);
  xmlHttp.send(null);
};

/*
When the user selects a source from the dropdown menu on the header, replace
the content of the page with articles from the newly selected source. Display
the loading pop up when the user first selects the new source, and hide it on
success.
*/

var sourceCollection = document.getElementById('sourceList').getElementsByTagName('a');
var sourceArray = Array.from(sourceCollection);
sourceArray.forEach(function (sourceLink) {
  sourceLink.addEventListener('click', getRequest(sourceLink.id), false);
});

function getRequest (sourceName) {
// HTTP Request Parameters by Source
  // Hacker News
  var source_HN = 'hacker-news';
  var defaultImageUrl_HN = 'https://news.ycombinator.com/favicon.ico';
  // Financial Times
  var source_FT = 'financial-times';
  var defaultImageUrl_FT = 'https://www.ft.com/__assets/creatives/brand-ft/icons/v2/open-graph.png';
  // Recode
  var source_Recode = 'recode';
  var defaultImageUrl_Recode = 'https://pbs.twimg.com/profile_images/729365899828989952/o0AuZCNW.jpg';

 // If the id of the source link matches one of the three source IDs, run a GET request for that source
  if (sourceName === source_HN) {
   console.log(sourceName);
   httpGet(source_HN, defaultImageUrl_HN);
  }
  else if (sourceName === source_FT) {
   console.log(sourceName);
   httpGet(source_FT, defaultImageUrl_FT);
  }
  else if (sourceName === source_Recode) {
   console.log(sourceName);
   httpGet(source_Recode, defaultImageUrl_Recode);
  }
}

// 1. Broken Scripts:
/* a) When the user clicks/taps the search icon, expand the input box. Best approach
for this is to toggle the `.active` class for the `#search` container. If the
search input box is already expanded tapping the search icon again will close
the input. */
// var searchContainer = document.getElementById('search');
// var searchIcon = searchContainer.getElementsByTagName('a')[0];
// searchIcon.addEventListener('click', function () {
//   if (searchContainer.className === 'active') {
//     searchContainer.className = '';
//   }
//   else {
//     searchContainer.className === 'active';
//   }
// }, false);
// Pressing the "Enter" key should also close the opened input box.

// b) When user selects article title, show #popUp` overlay
// var articleLinks = document.getElementsByClassName('articleLink');
// console.log(articleLinks);
// addEventListener('mouseover', function () {
  // document.getElementById('popUp').className.replace( /(?:^|\s)hidden(?!\S)/g , '' );
// });

// 2. __Additional UI interaction rules:__
/* - Add functionality to hide the pop-up when user selects the "X" button on the
  pop-up.
- Clicking/tapping the "Feedr" logo will display the main/default feed. */
