const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


function getDataFromApi(term, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: 'AIzaSyCyutO305hTzOHw0rLIZ0xJB5gKNLTwSX0',
      q: term,
      maxResults: 25
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  console.log(result);
  let url = '';
  if(result.id.kind === "youtube#channel") {
    url = `https://www.youtube.com/channel/${result.id.channelId}`;
  } else {
    url = `https://www.youtube.com/watch?v=${result.id.videoId}`;
  }
  return `
    <div>
      <h2>
      <a class="results" href="${url}" target="_blank">${result.snippet.title}</a></h2>
      <p><a class="results" href="${url}" target="_blank"><img src = ${result.snippet.thumbnails.medium.url}></img></a></p> 
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.results').html(results);
}

function termOnSubmit(){
  $('button').on('click', function(event){
    event.preventDefault();
    let userInput = $('#term-entry');
    let term = userInput.val();
    getDataFromApi(term, displayYouTubeSearchData); 
    userInput.val("");
  });
  $(document).keyup(function () {
    if (event.keyCode == 13) {
      termOnSubmit();
    }
    console.log(event.keyCode);
  });
}

termOnSubmit();



