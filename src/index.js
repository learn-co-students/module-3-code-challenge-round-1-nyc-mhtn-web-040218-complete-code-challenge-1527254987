document.addEventListener('DOMContentLoaded', function() {
  const imageId = 15 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let image = document.getElementById('image')
  let name = document.getElementById('name')
  let likes = document.getElementById('likes')
  let comment = document.getElementById('comments')
  const likeButton = document.getElementById('like_button')


function incrementLikes(event) {
  event.preventDefault()
  debugger
  likes.innerText += 1
}

likeButton.addEventListener('click', incrementLikes)

function appendInfoToDom(objs) {
  image.innerHTML += objs.url
  name.innerHTML += objs.name
  likes.innerHTML += objs.like_count
  comment.innerHTML += `<li>${objs.comments[0].content}</li>`

}


function fetchMessages() {
  fetch(imageURL)
  .then(r=>r.json())
  .then(objs => {
    appendInfoToDom(objs)
  })
}

function postLikesToDom() {
  const config {
    method: 'POST',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    body: {JSON.stringify({})}


  }



}
fetchMessages()



})
