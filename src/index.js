document.addEventListener('DOMContentLoaded', function() {
  const imageId = 2 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

fetch ('https://randopic.herokuapp.com/images/2')
.then(response => response.json())
.then(jsondata => {create(jsondata)} )


  function create(jsondata){
    let imageId = jsondata.id
    let image = jsondata.url
    let imageName = jsondata.name
    let like_count = jsondata.like_count
    let imagewrapper = document.getElementById("image_card")
    let imageholder = document.createElement("img")
    let comments = jsondata.comments
    let comment_wrapper_new = document.getElementById('comments')
    for (i=0; i<comments.length; i++){
      comment_wrapper_new.innerHTML += `<li id=${comments[i].id}>${comments[i].content}</li>`
      let deleteform = document.createElement("FORM")
      deleteform.setAttribute("commentid", `${comments[i].id}`)
      let deletebutton = document.createElement("INPUT")
      deletebutton.setAttribute("type", "submit")
      deletebutton.setAttribute("value", "Delete")
      deletebutton.setAttribute("class", "deletebutton")
      comment_wrapper_new.appendChild(deleteform)
      deleteform.appendChild(deletebutton)
    }

    imageholder.setAttribute("src", image)
    imagewrapper.prepend(imageholder)

    let h4 = document.getElementById("name")
    h4.innerHTML += `${imageName}`

    let like_button = document.getElementById("like_button")
    let like_counter = document.getElementById("likes")
    like_counter.innerText = like_count



    like_button.addEventListener('click', e => {
          like_counter.innerText++
          let integer_like_counter = parseInt(like_counter.innerText)
      fetch ('https://randopic.herokuapp.com/likes', {
        method: "POST",
        headers:{'Accept':'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify({like_count: `${integer_like_counter}`, image_id: 2})
      })
    })

    comment_form_submit = document.querySelector('#comment_form > input[type="submit"]:nth-child(2)')

    comment_form_submit.addEventListener('click', e => {
      e.preventDefault();
      let comment_wrapper = document.getElementById('comments')
      comment_wrapper.innerHTML += `<li>${e.target.parentNode.children[0].value}</li>`
      let deleteform = document.createElement("FORM")
      let deletebutton = document.createElement("INPUT")
      deletebutton.setAttribute("type", "submit")
      deletebutton.setAttribute("value", "Delete")
      deletebutton.setAttribute("class", "deletebutton")
      comment_wrapper.appendChild(deleteform)
      deleteform.appendChild(deletebutton)

      fetch ('https://randopic.herokuapp.com/comments', {
        method: "POST",
        headers:{'Accept':'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify({image_id: 2, content: `${e.target.parentNode.children[0].value}`})
      })
      .then(response => response.json())
      .then(json => {deleteform.setAttribute("commentid", `${json.id}`)} )
      .then(
        document.querySelector('#comment_input').value = ""
      )

    })

    document.addEventListener('click', e =>{
      if (e.target.value === "Delete"){
        debugger
        let commentid = e.target.parentNode.getAttribute('commentid')
        e.preventDefault()
        fetch (`https://randopic.herokuapp.com/comments/${commentid}`, {
          method: "DELETE",
          headers:{'Accept':'application/json', 'Content-Type':'application/json'},
        })
        .then(response => response.json())
      }
    })

  }
})
