$(document).ready(function() {
  var posts = [];
  var users = [];
  axios
    .all([
      axios.get('https://jsonplaceholder.typicode.com/posts'),
      axios.get('https://jsonplaceholder.typicode.com/users')
    ])
    .then(
      axios.spread(function(postsResponse, usersResponse) {
        posts = postsResponse.data;
        users = usersResponse.data;
        createPost(posts, users);
      })
    )
    .catch(function(err) {
      console.log(err);
    });

  function createPost(posts, users) {
    $('.posts').empty();
    for (var i = 0; i < posts.length; i++) {
      var post = posts[i];
      var user = users[post.userId - 1];
      var $cardPost = $(`<div class="card-post">
        <div class="card-post-head">
          <img src="https://via.placeholder.com/120">
          <div class="card-post-info">
            <p>${user.name}</p>
            <p>${user.email} | ${user.address.city}</p>
          </div>
        </div>
        <p><strong>${post.title}</strong></p>
        <p>${post.body}</p>
      </div>`);
      $('.posts').append($cardPost);
    }
  }

  $('input').on('input', function(event) {
    event.preventDefault();
    filterByKeyword($(this).val());
  });

  function filterByKeyword(keyword) {
    var postFiltered = [];
    for (var i = 0; i < posts.length; i++) {
      var post = posts[i];
      if (post.body.search(keyword) > -1 || post.title.search(keyword) > -1) {
        postFiltered.push(post);
      }
    }
    createPost(postFiltered, users);
  }
});
