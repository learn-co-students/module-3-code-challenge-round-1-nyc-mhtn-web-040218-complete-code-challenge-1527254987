document.addEventListener('DOMContentLoaded', function() {
  const imageId = 1 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageField = document.getElementById("image");
  const imageNameField = document.getElementById("name");
  const imageLikesField = document.getElementById("likes");
  const commentsField = document.getElementById("comments");
  const likesBtn = document.getElementById("like_button");
  const commentFormField = document.getElementById("comment_form");


  fetch(imageURL).then(response => response.json()).then(data => manipulateDOM(data));

  function manipulateDOM(data) {
    imageField.setAttribute("src", data.url);
    imageNameField.innerText = data.name;
    imageLikesField.innerText = data.like_count;
    data.comments.forEach(function(commentObj) {
      const listItem = document.createElement("li");
      listItem.setAttribute("id", `${commentObj.id}`);
      listItem.innerHTML = commentObj.content + `         <button id="btn-${commentObj.id}" onclick="removeComment(this)">Delete comment</button>`;
      commentsField.appendChild(listItem);
    });
  }

  likesBtn.addEventListener("click", function(event) {
    const existingLikesCount = Number(imageLikesField.innerText);
    imageLikesField.innerText = `${existingLikesCount + 1}`;
    //optimistic rendering - I don't like this!
    const config = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    };

    //Goodbye response!
    fetch("https://randopic.herokuapp.com/likes", config);
  });

  commentFormField.addEventListener("submit", function(event) {
    event.preventDefault();
    const commentInputField = document.getElementById("comment_input");

    if(commentInputField.value === "") {
      alert("Comment field cannot be empty!");
    }

    const listItem = document.createElement("li");
    //Cannot provide the id for comment yet because we do not know the id of the comment. We must ask the server.
    //This is an optimist rendering so the comment will de displayed without an id.
    //BUT once we refresh the page, all the comments will be rendered and each comment will have a id because we
    //are sending a post request to comments API which will take care of the id.
    //listItem.setAttribute("id", `${commentObj.id}`);
    listItem.innerHTML = commentInputField.value + `         <button>Delete comment</button>`;
    commentsField.appendChild(listItem);

    //optimistic rendering - I don't like this!
    const config = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentInputField.value
      })
    };

    //Goodbye response!
    fetch("https://randopic.herokuapp.com/comments", config);
    commentInputField.value = "";
  });
})

function removeComment(obj) {
  const commentId = obj.id.split("-")[1]
  const comment = document.getElementById(commentId);
  comment.remove();
  fetch("https://randopic.herokuapp.com/comments/" + commentId, {method: "DELETE"});
}
