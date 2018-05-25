document.addEventListener('DOMContentLoaded', function() {
  const imageId = 18 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let likeButton = document.querySelector('#like_button')
  let commentForm = document.querySelector('#comment_form')
  let commentUl = document.querySelector('#comments')

  function increaseLikesOnPage(e) {
    // debugger
    let likesOnPage = document.getElementById('likes').innerHTML
    likes.innerHTML = ++likesOnPage
    let currentLikes = likes.innerHTML
    likes.innerHTML = currentLikes
    let updatedLikes = likes.innerHTML


    let imgId = document.getElementById('image').value

    // FOR EXPLAINATION

    // fetch(`https://randopic.herokuapp.com/images/${imgId}`, {
    //   method: "PATCH",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: {
    //     likes: updatedLikes
    //   }
    // })

    fetch(`https://randopic.herokuapp.com/likes/`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imgId
      })
    })
    .then(res => res.json())
    .then(json => console.log(json))
  }

  function renderLikes(imageData) {
    // debugger
    let likesOnPage = document.getElementById('likes')
    let likeCount = imageData.like_count
    likesOnPage.innerHTML = `${likeCount}`
  }

  function renderComment(e) {
    comment = e.currentTarget["0"].value
    commentLi = document.createElement('li')
    commentLi.innerText = comment
    commentUl.prepend(commentLi)

    let imgId = document.getElementById('image').value

      fetch(`https://randopic.herokuapp.com/comments`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imgId,
          content: comment
        })
      })
      .then(res => res.json())
      .then(json => console.log(json))
    // debugger
  }

  function renderImage(imageData) {
    let imgUrl = imageData.url
    let imgTag = document.getElementById("image")
    imgTag.setAttribute("src", imgUrl)
    imgTag.value = imageData.id
    renderLikes(imageData)
  }

  likeButton.addEventListener('click', function(e) {
    increaseLikesOnPage(e)
  })

  commentForm.addEventListener('submit', function(e) {
    e.preventDefault()
    renderComment(e)
  })

  fetch('https://randopic.herokuapp.com/images/')
    .then(res => res.json())
    .then(json => renderImage(json))
})
