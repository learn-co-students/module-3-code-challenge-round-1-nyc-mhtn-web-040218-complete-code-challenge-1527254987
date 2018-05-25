document.addEventListener('DOMContentLoaded', function() {
  // all URLs in adapter.js now

  const imgId = document.getElementById("image");
  const imgName = document.getElementById("name");
  const commentsUl = document.getElementById("comments");
  const likeButton = document.getElementById("like_button");
  const likes = document.getElementById("likes");
  const form = document.getElementById("comment_form");
  const input = document.getElementById("comment_input");

  // fetch image
  function fetchImg() {
    fetchOperations.fetchObj().then(display);
  }

  // display image information and comments
  function display(img) {
    // imgId = `<img id="image" src="${img.url}" data-id="${img.id}"/>`;
    // imgName = `<h4 id="name">${img.name}</h4>`;
    imgId.src = img.url;
    imgId.dataset.id = img.id;
    imgName.innerText = img.name;
    likes.innerText = img.like_count;

    img.comments.forEach(comment => {   //[...img.comments]
      const li = document.createElement('li');
      li.innerText = comment.content;
      li.id = comment.id;

      const button = document.createElement('button');
      button.innerText = "X";

      li.appendChild(button);
      commentsUl.appendChild(li);
    })
  }

  // adding event listener for like image
  function addLikeListener() {
    likeButton.addEventListener('click', addLike);
  }

  // adding like event handler
  function addLike(event) {
    const likesInt = parseInt(likes.innerText);
    likes.innerText = likesInt + 1;
    fetchOperations.fetchCreateLike();
  }

  // adding event listener for adding comment
  function addCommentListener() {
    form.addEventListener('submit', addComment);
  }

  // adding comment event handler
  function addComment(event) {
    event.preventDefault();

    const li = document.createElement('li');
    li.innerText = input.value;
    commentsUl.appendChild(li);

    fetchOperations.fetchCreateComment(input.value);

    input.value = "";
  }

  // adding event listener for delete
  function addDeleteListener() {
    commentsUl.addEventListener('click', deleteListener);
  }

  // delete event handler
  function deleteListener(event) {
    if (event.target.tagName === 'BUTTON') {
      const li = event.target.parentElement;
      fetchOperations.fetchDeleteComment(li.id);
      li.remove();
    }
  }

  // start the app
  function startApp() {
    fetchImg();
    addLikeListener();
    addCommentListener();
    addDeleteListener();
  }

  startApp();
})
