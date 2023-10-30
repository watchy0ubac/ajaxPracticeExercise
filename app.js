console.log("Let's get this party started!");

const $gifList = $("#gif-area");
const $searchVal = $("#search");

function addGif(res) {
  let numResults = res.data.length;
  if (numResults > 0) {
    let randomId = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomId].images.original.url,
      class: "w-100",
    });
    $newCol.append($newGif);
    $gifList.append($newCol);
  }
}

$("form").on("submit", async function (e) {
  e.preventDefault();

  let searchInput = $searchVal.val();
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchInput,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
    },
  });
  console.log(res.data);
  addGif(res.data);
  $searchVal.val("");
});

$("#remove").on("click", function (e) {
  e.preventDefault();
  $searchVal.val("");
  $gifList.empty();
});
