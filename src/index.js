document.addEventListener('DOMContentLoaded', function() {
  const imageId = 12 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let likesCounter = document.getElementById('likes');
  let imgTag = document.getElementById('image');
  let name = document.getElementById('name');
  let commentsDiv = document.getElementById('comments');

  //bonus
  function deleteButton() {return `<button type="button" data-commentId=${this.id}>x</button>`}

  // 1. GET THE IMAGE DATA
  fetch(imageURL).then(r => r.json()).then(imgData => {
    let imgSrc = imgData.url;
    let imgName = imgData.name;
    let imgLikes = imgData.like_count;
    let imgComments = imgData.comments;

    imgTag.src = imgSrc;
    name.innerText = imgName;
    likesCounter.innerText = imgLikes;
    
    for(let comment of imgComments){
      let li = document.createElement("li");
      li.innerText = comment.content;
      li.setAttribute("data-imageId", comment.image_id);
      commentsDiv.appendChild(li);

      //bonus
      li.innerHTML += `  ${deleteButton.call(comment)}` 
    };
  })

  // 2. LIKE FEATURE
  let likeButton = document.getElementById('like_button');
  likeButton.addEventListener("click", (event) => {
    likesCounter.innerText = parseInt(likesCounter.innerText) + 1

    //2b. BACKEND
    fetch('https://randopic.herokuapp.com/likes', 
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'image_id': imageId,
        'like_count': likesCounter.innerText
      })
    });
  });

  // 3. COMMENTS FEATURE
  let commentForm = document.getElementById('comment_form');
  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    //3a. OPTIMISTIC
    let newComment = event.target.firstElementChild.value;
    if (newComment === "") {alert("Comment cannot be empty")
    } else {
      let li = document.createElement("li");
      li.innerText = newComment;
      li.setAttribute("data-ImageId", imageId);
      commentsDiv.appendChild(li);
      event.target.reset()

      //3b. BACKEND
      fetch('https://randopic.herokuapp.com/comments', 
      { method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          content: newComment
        })
      }) //bonus
      .then((r) => r.json())
      .then((newCommData) => { li.innerHTML += `  ${deleteButton.call(newCommData)}` })
    }
  });

  // BONUS DELETE
  commentsDiv.addEventListener("click", (event) => {    
    if (event.target.tagName === "BUTTON") {
      let commentId = event.target.dataset.commentid
      event.target.parentElement.remove()
      
      fetch(`https://randopic.herokuapp.com/comments/${commentId}`, 
      { method: 'DELETE'        
      })
    }
  })
})