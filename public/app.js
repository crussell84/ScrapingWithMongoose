const getComments = function (articleID) {
  $("#comments").empty();
  $.ajax({
    method: "GET",
    url: "/articles/" + articleID
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      data.forEach(function (element) {
        $('#comments').append(`<li><strong>${element.title}</strong><button class="delete btn btn-sm btn-danger m-1" data-id="${element._id}" data-article="${articleID}">X</button><p>${element.body}</p></li>`);
      });

      // An input to enter a new title
      $("#comments").append("<input id='titleinput' placeholder='Title' name='title' >");
      // A textarea to add a new note body
      $("#comments").append("<textarea id='bodyinput' placeholder='Comment' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#comments").append("<button data-id='" + articleID + "' id='savenote'>Save Comment</button>");

    });
};
const scrapeArticles = function () {
    $.ajax({
      method: "GET",
      url: "/scrape"
    })
      .then(function (data) {
        location.reload(true);
      });
  }

$("li.article").on("click", function () {
  // Empty the notes from the note section

  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  getComments(thisId);
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      getComments(thisId);
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "button.delete", function () {
  console.log("I clicked a button!");
  var noteId = $(this).attr("data-id");
  var articleId = $(this).attr("data-article");
  $.ajax({
    method: "DELETE",
    url: "/notes/" + noteId
  }).then(function (data) {
    getComments(articleId);
  })
})
$("#scrape").on("click", scrapeArticles);