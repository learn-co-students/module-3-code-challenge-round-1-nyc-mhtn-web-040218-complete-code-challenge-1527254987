const imageId = 17 //Enter your assigned imageId here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

const fetchOperations = {
  // parse response json
  parseJson: function(response) {
    return response.json();
  },
  // fetch image
  fetchObj: function() {
    return fetch(imageURL).then(this.parseJson);
  },
  // create like
  fetchCreateLike: function() {
    const config = {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({image_id: imageId})
    }
    return fetch(likeURL, config);
  },
  // create comment
  fetchCreateComment: function(content) {
    const config = {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({image_id: imageId, content: content})
    }
    return fetch(commentsURL, config);
  },
  // delete comment
  fetchDeleteComment: function(id) {
    return fetch(`${commentsURL}/${id}`, {method: 'DELETE'});
  }
}
