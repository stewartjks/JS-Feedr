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
        // Hide existing articles from 'main' content container
        var articleContainer = document.getElementById('main');
        var staleArticles = articleContainer.querySelectorAll('article:not(hidden)');
        staleArticles.forEach(
          function(article) {article.className += ' hidden';}
        );

        // Convert the response to an object and iterate over elements in 'articles' property
        var responseObject = JSON.parse(xmlHttp.response);
        responseObject.articles.forEach(function (article) {
            var newArticle = document.createElement('article');
            newArticle.className = 'article';

            // Create image container for article
            var newArticleImageContainer = document.createElement('section');
            newArticleImageContainer.className = 'featuredImage';
            var newArticleImage = document.createElement('img');
            if (article.urlToImage !== null && article.urlToImage !== '') {
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
            articleContainer.appendChild(newArticle);
        });

        // Hide loader animation
        document.getElementById('popUp').className = 'loader hidden';
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
   httpGet(source_HN, defaultImageUrl_HN);
  }
  else if (sourceName === source_FT) {
   httpGet(source_FT, defaultImageUrl_FT);
  }
  else if (sourceName === source_Recode) {
   httpGet(source_Recode, defaultImageUrl_Recode);
  }
}

/* When the user selects a source from the dropdown menu on the header, replace
the content of the page with articles from the newly selected source. Display
the loading pop up when the user first selects the new source, and hide it on
success. */
(function listenForSourceClicks () {
  var sourceCollection = document.getElementById('sourceList').getElementsByTagName('a');
  var sourceArray = Array.from(sourceCollection);
  // If menu item is clicked, fire getRequest with menu item as argument
  sourceArray.forEach(function (sourceLink) {
    sourceLink.addEventListener('click', getRequest.bind(null, sourceLink.id), false);
  });
})();

// Add return to home functionality to Feedr nav logo
(function listenForLogoClicks () {
  var articleContainer = document.querySelector('section#main');
  var logoLink = document.querySelector('header section.container a');
  // Clicking/tapping the "Feedr" logo will display the main/default feed.
  logoLink.addEventListener('click', function returnToMain () {
    // Hide existing articles from 'main' content container
    var articleContainer = document.getElementById('main');
    var staleArticles = articleContainer.querySelectorAll('article:not(hidden):not(original)');
    var originalArticles = articleContainer.querySelectorAll('article.original');
    staleArticles.forEach(
        function hideArticle (article) {
          article.className += ' hidden';
        }
    );
    originalArticles.forEach(
      function showArticle (article) {
        article.classList.remove('hidden');
      }
    );
  });
})();

/* b) When user clicks article title, show #popUp overlay */
(function listenForArticleClicks () {
  // Select article links
  var articleLinks = document.querySelectorAll('section.articleContent a');
  // Add listener
  articleLinks.forEach(function (articleLink) {
    articleLink.addEventListener('click', function displayLoader () {
      var loaderPopUp = document.querySelector('div#popUp')
      return loaderPopUp.className = 'loader';
    }, false);
  });
})();

(function listenForPopUpClose () {
  var popUpCloseButton = document.querySelector('div#popUp a.closePopUp');
  popUpCloseButton.addEventListener('click', function popUpCloser () {
    var loaderPopUp = document.querySelector('div#popUp')
    return loaderPopUp.className = 'loader hidden';
  }, false);
})();

// When the user clicks/taps the search icon, expand the input box.
(function listenForSearchIconClicks () {
  var searchIconLink = document.querySelector('header section#search a');
  var searchBoxContainer = document.querySelector('header section#search');
  var sourcesDropdown = document.querySelector('header section.container nav li');
  searchIconLink.addEventListener('click', function () {
    if (searchBoxContainer.className === 'active') {
      searchBoxContainer.className = '';
      sourcesDropdown.classList.remove('hidden');
    }
    // If the search input box is already expanded, tapping the search icon again will close the input.
    else {
      searchBoxContainer.className = 'active';
      sourcesDropdown.className += 'hidden';
    }
  }, false);
  // Pressing the "Enter" key should close the opened input box.
  searchIconLink.addEventListener('keypress', function (e) {
    var keyFired = e.which || e.keyCode;
    if (keyFired === 13 && searchBoxContainer.className === 'active') {
      searchBoxContainer.className = '';
      sourcesDropdown.classList.remove('hidden');
    }
  })
})();
