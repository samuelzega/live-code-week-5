const baseurl = 'http://localhost:3000'
let idUpate = null
$(document).ready(function() {
  if (localStorage.token) {
    showComicCollection()
  } else {
    $('#loginForm').show()
    $('#alert').hide()
    $('#registerForm').hide()
    $('#commicCollection').hide()
    $('#updateComic').hide()
    $('#logout').hide()
  }

  $('#loginBtn').click(function(e) {
    e.preventDefault()
    let email = $('#emailLogin').val()
    let password = $('#passwordLogin').val()
    login(email, password)
  })

  $('#btnRegisterForm').click(function(e) {
    e.preventDefault()
    let email = $('#emailRegister').val()
    let name = $('#nameRegister').val()
    let password = $('#passwordRegister').val()
    register(name, email, password)
  })
  $('#logOutBtn').click(function(e) {
    e.preventDefault()
    localStorage.removeItem('token')
    $('#loginForm').show()
    $('#alert').hide()
    $('#registerForm').hide()
    $('#commicCollection').hide()
    $('#updateComic').hide()
    $('#logout').hide()
  })

  $('#updateBtn').click(function(e) {
    e.preventDefault()
    let title = $('#titleUpdate').val()
    let author = $('#authorUpdate').val()
    let imageUrl = $('#imageUpdate').val()
    update(author, title, imageUrl)
  })

  $('#showRegister').click(function(e) {
    e.preventDefault()
    $('#loginForm').hide()
    $('#alert').hide()
    $('#registerForm').show()
    $('#commicCollection').hide()
    $('#updateComic').hide()
    $('#logout').hide()
  })
})

function login(email, password) {
  $.ajax({
    url: `${baseurl}/users/login`,
    method: 'post',
    data: {
      email,
      password
    },
    success: function(data) {
      console.log(data)
      localStorage.setItem('token', data)
      showComicCollection()
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function register(name, email, password) {
  $.ajax({
    url: `${baseurl}/users/register`,
    method: 'post',
    data: {
      name,
      email,
      password
    },
    success: function(data) {
      console.log(data)
      $('#loginForm').show()
      $('#alert').hide()
      $('#registerForm').hide()
      $('#commicCollection').hide()
      $('#updateComic').hide()
      $('#logout').hide()
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function showComicCollection() {
  getAllComic()
  $('#loginForm').hide()
  $('#alert').hide()
  $('#registerForm').hide()
  $('#commicCollection').show()
  $('#updateComic').hide()
  $('#logout').show()
}

function getAllComic() {
  $.ajax({
    url: `${baseurl}/comics`,
    method: 'get',
    headers: {
      token: localStorage.getItem('token')
    },
    success: function(data) {
      $('#comicContent').empty()
      console.log(data)
      data.forEach(element => {
        $('#comicContent').append(`
        <div class="col-4 mb-4">
        <div class="card text-center">
          <img
            src="${element.imageUrl}"
            class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">Author: ${element.author}</p>
            <button onclick="findOne('${element.id}')" class="btn btn-primary">Edit</button>
          </div>
        </div>
      </div>
        `)
      })
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function showEdit() {
  $('#updateComic').show()
}

function findOne(id) {
  $.ajax({
    url: `${baseurl}/comics/findone/${id}`,
    method: 'get',
    headers: {
      token: localStorage.getItem('token')
    },
    success: function(data) {
      showEdit()
      $('#titleUpdate').val(data.title)
      $('#authorUpdate').val(data.author)
      $('#imageUpdate').val(data.imageUrl)
      console.log(data)
      idUpate = data.id
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function update(author, title, imageUrl) {
  $.ajax({
    url: `${baseurl}/comics/findone/${idUpate}`,
    method: 'post',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      author,
      title,
      imageUrl
    },
    success: function(data) {
      $('#updateComic').hide()
      getAllComic()
    },
    error: function(err) {
      console.log(err)
    }
  })
}
