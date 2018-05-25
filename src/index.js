document.addEventListener('DOMContentLoaded', function(event) {
  const imageId = 10 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likesCounter = document.getElementById('likes')


  function getPicture() {
    fetch(imageURL).then(res => res.json()).then(renderImage)
  }

  //{id: 10, url: "http://blog.flatironschool.com/wp-content/uploads/2017/06/5-year-event-352x200.jpg", name: "Avi and Adam", like_count: 0, comments: Array(1)}
  function renderImage(image) {
    const imgTag = document.getElementById('image')
    const nameTag = document.getElementById('name')
    const likesCounter = document.getElementById('likes')
    const commentUl = document.getElementById('comments')

    imgTag.setAttribute('src', image.url)
    nameTag.innerText = image.name
    likesCounter.innerText = image.like_count
    image.comments.forEach(comment => {
      //{id: 6892, content: "first comment!", image_id: 10, created_at: "2018-05-24T22:04:59.941Z", updated_at: "2018-05-24T22:04:59.941Z"}
      commentUl.innerHTML += `<li data-id="${comment.id}" data-image-id="${comment.image_id}">${comment.content}        <button type="submit">Delete Comment</button></li>`
    })
  }

  //adding likes
  const likesButton = document.getElementById('like_button')

  likesButton.addEventListener("click", (e) => {
    likesCounter.innerText = parseInt(likesCounter.innerText) + 1
    postLikes()
  })

  function postLikes() {
    fetch(likeURL, {
      method: "POST",
      headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
      body: JSON.stringify({image_id: imageId, like_count: parseInt(likesCounter.innerText)})
    })
  }

  //Add comments
  const commentForm = document.getElementById('comment_form')
  const commentInput = document.getElementById('comment_input')

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if (!commentInput.value) {
      alert("Field cannot be blank!")
    } else {
      const commentUl = document.getElementById('comments')
      commentUl.innerHTML += `<li id="${commentInput.value}">${commentInput.value}   <button type="submit">Delete Comment</button></li>`
      const comment = document.getElementById(`${commentInput.value}`)

      postComment().then(json => {
        comment.setAttribute("data-id", json.id)
      }).then(commentInput.value = "")
    }
  })

  function postComment() {
    return fetch(commentsURL, {
      method: "POST",
      headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'},
      body: JSON.stringify({image_id: imageId,
                            content: commentInput.value})
    }).then(res => res.json())
  }

  //delete comments
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON"&& e.target.id != 'like_button') {
      deleteComment(e.target.parentNode.dataset.id)
      e.target.parentNode.remove()
    }
  })

  function deleteComment(id) {
    fetch (`${commentsURL}${id}`, {
      method: "DELETE",
    })
  }

  function startApp() {
    getPicture()
  }

  startApp()


})
