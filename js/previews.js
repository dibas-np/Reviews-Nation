//getting the data stored in json server and showing in the html page
axios.get('http://localhost:3000/previews')
.then(response => response.data)
.then(data=>{
  let reviews = '';
  data.forEach(item => {
    reviews += ` <div class="col-popular" id="previews">
    <figure>
    <img src="${item.img}">
    </figure>
    <figcaption class="popular-reviews-caption">
    <h1>${item.name}</h1>
    <p>${item.author}</p>
    </figcaption>
    </div>`
  })
  document.getElementById('previews').innerHTML = reviews
})
