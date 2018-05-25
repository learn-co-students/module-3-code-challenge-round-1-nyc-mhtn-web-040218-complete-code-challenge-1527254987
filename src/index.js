document.addEventListener('DOMContentLoaded', function() {
  const imageId = 5//Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageCard = document.getElementById("image_card")
  const likes = document.getElementById("likes")
  const likeButton = document.getElementById("like_button")
  const namePlace = document.getElementById("name")
  const commentSubmit = document.getElementById("comment_submit")
  const commentInput = document.getElementById("comment_input")
  const commentPlace = document.getElementById("comments")
  console.log("JS linked");
  console.log(imageCard);

  fetch(imageURL)
  .then(res => res.json())
  .then(json => imagePoster(json))


  function imagePoster(json){
    let image =document.createElement("img")
    let imageName = document.createElement('p')
    imageName.innerText = json.name
    image.setAttribute("src", json.url)
    namePlace.prepend(imageName)
    imageCard.prepend(image)
    likes.innerText = json.like_count
    console.log(json.comments);
    commentHandler(json.comments)
  }


  function commentHandler(comments){
    comments.forEach(comm => {
      let li = document.createElement("li")
      li.innerText = comm.content
      commentPlace.append(li)
    })
  }

  likeButton.addEventListener("click", function(){
    console.log("button hit")
    likes.innerText = Number(likes.innerText) + 1

    fetch(likeURL, {
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })

    })
    .then(res => res.json())
    .then(json => console.log(json))
  })

  commentSubmit.addEventListener('click', function(e){
    e.preventDefault()
    let newLi = document.createElement("li")
    newLi.innerText = commentInput.value
    commentPlace.append(newLi)

    fetch(commentsURL, {
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentInput.value
      })
      })
      .then(res => res.json())
      .then(json => console.log(json))
      commentInput.value = ""
    })
  })
