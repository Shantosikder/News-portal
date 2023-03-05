let fetchData = [];
const fetchCategories = () =>{
    const URL = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        showCategories(data.data.news_category);
    })
}

const showCategories = data =>{
    // console.log(data);
    const categoriesContainer = document.getElementById('categories-container');
    data.forEach(singleData =>{
        // console.log(singleData);
        // const {category_name,} = singleData;
        categoriesContainer.innerHTML += `
        <a class="nav-link" onclick="fetchCategoriesNews('${singleData.category_id}','${singleData.category_name}')" href="#">${singleData.category_name}</a>
        `
    });
}

const fetchCategoriesNews = (category_id,category_name) =>{
    // console.log(category_id);
    const URL = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    // console.log(URL);
    fetch(URL)
    .then(response => response.json())
    .then(data => {
      fetchData = data.data;
      showAllNews(data.data, category_name)
    });
}

const showAllNews = (data,category_name) =>{
    // console.log(data,category_name);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;
    const newsContainer =  document.getElementById('all-news');
    newsContainer.innerHTML= ''
    data.forEach(singleNews=>{
        // console.log(singleNews);
    const {_id,image_url,title,details,author,total_view,rating} = singleNews
    const card = document.createElement('div');
    card.classList.add("card", "mb-3");
    card.innerHTML = `
    <div class="row g-0">
    <div class="col-md-4">
      <img src=${image_url} class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8 d-flex flex-column">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${details.slice(0,200)}.....</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
      <div class="card-footer border-0 bg-body d-flex justify-content-between">

      <div class="d-flex gap-3">
      <img src=${author.img} class="img-fluid rounded-circle" height="40" width="40">
      <div class="">
      <p class="m-0 p-0">${author.name ? author.name : "NOt available"}</p>
      <p class="m-0 p-0">${author.published_date}</p>
      </div>
      </div>

      <div class="d-flex align-items-center gap-2">
      <i class="fas fa-eye"></i>
      <p class="m-0 p-0">${total_view ? total_view : "Not Available"}</p>
      </div>

      <div class="d-flex justfy-content-center gap-2">

      ${generateStars(rating.number)}
      <i class="fas fa-star-half"></i>
      <p>${rating.number}</p>
      </div>

      <div>
      <i class="fas fa-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchNewsDetails('${_id}')"></i>
      </div>

      </div>
    </div>
  </div>
    `;
    newsContainer.appendChild(card);
    })
}

const fetchNewsDetails = (news_id) =>{
    const URL = `https://openapi.programming-hero.com/api/news/${news_id}`
    // console.log(URL);
    fetch(URL)
    .then(response => response.json())
    .then(data =>{
        showNewsDetail(data.data[0])
    })
}

    const showNewsDetail = (newsDetail) =>{
    const { _id, image_url, title, details, author, total_view, others_info } = newsDetail;
    document.getElementById("modal-body").innerHTML = `
    <div class= "card mb-3">
  
    <div class="row g-0">
      <div class="col-md-12">
        <img src=${image_url} class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-12 d-flex flex-column">
        <div class="card-body">
          <h5 class="card-title">${title} <span class="badge text-bg-warning">
          ${others_info.is_trending ? "Trending" : "Not trending"}</span></h5>
          <p class="card-text">
            ${details}
          </p>
        </div>
        <div class="card-footer border-0 bg-body d-flex justify-content-between">
          <div class="d-flex gap-2">
          <img src=${
            author.img
          } class="img-fluid rounded-circle" alt="..." height="40" width="40"/>
          <div>
          <p class="m-0 p-0">${author.name ? author.name : "Not available"}</p>
          <p class="m-0 p-0">${author.published_date}</p>
          </div>
          
          </div>
          <div class="d-flex align-items-center">
              <i class="fas fa-eye"></i>
              
              <p class="m-0 p-0">${total_view ? total_view : "Not available"}</p>
          </div>
          <div>
              <i class="fas fa-star"></i>
          
          </div>
          
        </div>
      </div>
    </div>
    </div>
    `;
    
  };

//show tanding news 
const showTrending=()=>{
  const trandingNews = fetchData.filter(singleData=> singleData.others_info.is_trending === true);
  const category_name = document.getElementById('category_name').innerText;

  showAllNews(fetchData, category_name);
}

//grnarate rating star
const generateStars= rating =>{
      let ratingHTML= '';
      for (let i = 1; i <= Math.floor(rating); i++){
          ratingHTML +=`<i class="fas fa-star"></i>`;
        
      }
      if(rating - Math.floor(rating)>0){
          ratingHTML+=`<i class="fas fa-star-half"></i>`
      }
      return ratingHTML
  }

// fetchCategories();