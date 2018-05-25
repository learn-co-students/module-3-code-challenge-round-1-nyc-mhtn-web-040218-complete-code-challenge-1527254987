//student id = 8

document.addEventListener('DOMContentLoaded', function() {
  const imageId = 8 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likeButton = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')

console.log('DOM LOADED')


  function loadImage() {
    fetch(imageURL).then(r=>r.json()).then(renderImage)
  }


  function renderImage(imageJson) {
    const imageTag = document.getElementById('image')
    imageTag.setAttribute('src', imageJson.url)

    const imageName = document.getElementById('name')
    imageName.innerHTML = imageJson.name

    const imageLikes = document.getElementById('likes')
    imageLikes.innerHTML = imageJson.like_count

    const imageComments = document.getElementById('comments')
    for (const comment of imageJson.comments){
      const singleComment = document.createElement('li')
      singleComment.setAttribute('id',`comment-${comment.id}`)
      singleComment.innerHTML = comment.content
      imageComments.append(singleComment)
    }
  }

likeButton.addEventListener('click', (e)=>{
  console.log("ADDING LIKE")

  const imageLikes = document.getElementById('likes')
  imageLikes.innerHTML = parseInt(imageLikes.innerHTML) + 1


  fetch(likeURL,{method:'POST',
   headers:{
  'Accept': 'application/json',
  'Content-Type': 'application/json'},
   body: JSON.stringify({image_id:8})})
})

commentForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const imageComments = document.getElementById('comments')
  const newComment = document.createElement('li')
  newComment.innerHTML = e.srcElement[0].value
  imageComments.append(newComment)

  fetch(commentsURL,{method:'POST',
   headers:{
  'Accept': 'application/json',
  'Content-Type': 'application/json'},
   body: JSON.stringify({image_id:8, content:e.srcElement[0].value})})


  console.log('SUBMIT')
})


loadImage()
})
