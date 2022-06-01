"use strict";

console.log("Let's get this party started!");

const API_KEY = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';
const searchTerm = $('#giphy-search');

//making the request
axios.get('http://api.giphy.com/v1/gifs/search', {params: {'q': searchTerm, 'api_key': API_KEY}});


// generate a random index in an array
function generateRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

// use ajax result to add a gif
function addImage(imageUrls) {
    if (imageUrls.length > 0) {
      const randomIdx = generateRandomIndex(imageUrls);
      const $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
      const $newGif = $("<img>", {
        src: imageUrls[randomIdx],
        class: "w-100"
      });

      $newCol.append($newGif);
      $("#giphy-area").append($newCol);
    }
  }

// get results from API. returns list of images
async function getGiphy(event){
    console.log('click')

    let searchValue = searchTerm.val();
    console.log('val', searchValue)

    let response = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchValue}&api_key=${API_KEY}`);

    console.log('getGiphy resp=', response);

    // not sure about this line
    // gets image URLS from response data
    return response.data.data.map(image => image.images.original.url)
}

async function showGiphy(evt) {
    evt.preventDefault();
    console.log("handleSubmit");

    const imageUrls = await getGiphy();
    addImage(imageUrls);
  }
$("form").on("submit", showGiphy);

