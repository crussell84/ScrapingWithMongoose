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
        $('#comments').append(`<li><strong>${element.title}</strong><p>${element.body}</p></li>`);
      });

      // An input to enter a new title
      $("#comments").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#comments").append("<button data-id='" + articleID + "' id='savenote'>Save Comment</button>");

    });
};


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
