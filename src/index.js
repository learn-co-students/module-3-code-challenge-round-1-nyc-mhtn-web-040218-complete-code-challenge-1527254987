// was going to set a limiter so u only send a change to the server every second
// but turns out that every like was an object. is there a way to batch the likes and send at once?
// let limiter = false


const imageId = 14 //Enter your assigned imageId here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const likeButton = document.getElementById('like_button')
const likes = document.getElementById("likes")
const commentForm = document.getElementById('comment_form')
//sneaky sneaky, changing the usual dash (-) into an underscore. or old code challenge? shrug
const comments = document.getElementById('comments')
likeButton.addEventListener('click', addLike)
commentForm.addEventListener('submit', addComment)


//getter for everything, sets the picture, and sets the comments, and likes
fetch(imageURL)
  .then( res => res.json())
  .then( res => {
    //sets MY pic
    document.getElementById("image").setAttribute("src", res['url'])
    //sets likes
    likes.innerHTML = res['like_count']

    //sets comments
    for(let i of res['comments']){
      let comment = document.createElement('li')
      comment.setAttribute("id", i['id'])
      comment.innerHTML = `${i['content']} <button onclick="delComment(${i['id']})">x</button>`
      comments.appendChild(comment)
    }
  })

function addComment(){
  event.preventDefault()
  let comment = commentForm['comment_input'].value
  let newComment = document.createElement('li')
  newComment.innerHTML = `${comment} <button>x</button>`
  comments.appendChild(newComment)
  const fn = res => {
    debugger
    newComment.setAttribute("id", res['id'])
    newComment.children[0].setAttribute('onclick', `delComment(${res['id']})`)
  }

  fetch(commentsURL,{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "image_id": 14,
      "content": `${comment}`,
    })
  })
    .then( res => res.json())
    .then( res => {
      debugger
      fn(res)
    })

  //clears the form after submission
  commentForm['comment_input'].value = ""
}


//delete function for comments
function delComment(id){
  console.log(id)
  fetch(commentsURL + `${id}`, {
    method: 'DELETE'
  })
  let delMe = document.getElementById(id)
  comments.removeChild(delMe)

}




//add likes function
function addLike(){
  likes.innerHTML = parseInt(likes.innerHTML) + 1

  fetch('https://randopic.herokuapp.com/likes',{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: '14',
      image_id: '14'
    })
  })
    // .then( res => res.json())
    // .then( res => console.log(res) )

}
