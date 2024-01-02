//blog button
document.getElementById("blog-btn").addEventListener("click", function () {
  window.location.href = "blog.html";
});

//PH tube
const handleTube = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
<button onclick="handleSort('${category.category_id}')" class="btn focus:bg-red-600 text-gray-500 focus:text-white">${category.category}</button>
`;
    tabContainer.appendChild(div);
  });
  // console.log(data.data);
};
let handleSort = async(id) =>{
  const cId = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  let data = await cId.json();
  data =data.data;
  document.getElementById("sort-view").addEventListener("click", function(){
    categoryId(data.sort(sortViews))
    function sortViews(a,b){
      return parseInt(b.others.views) - parseInt(a.others.views);
    }
  })
  categoryId(data);
}
//category id
const categoryId = async (data) => {
  // const cId = await fetch(
  //   `https://openapi.programming-hero.com/api/videos/category/${id}`
  // );
  // const data = await cId.json();
  // console.log(data)
  const viewsNewArray = [];
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (data.length === 0) {
    cardContainer.innerHTML = `
                <div class="grid grid-cols-1 p-0 m-0 col-span-4 justify-center items-center">
               <div class="text-center mx-auto">
               <img src="Icon.png" class="mx-auto"/>
               <h3 class="text-xl font-medium">Oops!!Sorry,There is no content here</h3> 
               </div>
                </div>
                `;
  } else {
    data?.forEach((news) => {
      // console.log(news)
      const div = document.createElement("div");

      const views = news?.others?.views;
      viewsNewArray.push(parseFloat(views));

      div.innerHTML = `

<div class="card bg-base-100 shadow-2xl w-92 h-96">
<figure><img class="h-72 w-80" src=${news?.thumbnail}/></figure>
${news.others.posted_date ? `<button class='btn absolute bg-black text-white bottom-30 mt-36 lowercase right-10 md:right-8 lg:right-2'>${secondsToHoursMinutes(news.others.posted_date)}</button>` : ""}

<div class="card-body">
  <h2 class="card-title">
    <div class="avatar">
        <div class="w-14 rounded-full">
          <img src=${news.authors[0]?.profile_picture}/>
        </div>
      </div>
    <div class="">${news.title}</div>
  </h2>
  <div class="flex gap-4">
    <div class="text-gray-500">${news.authors[0]?.profile_name}</div>
    <div class="">${
      news.authors[0]?.verified
        ? `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_11_290)">
    <path d="M19.375 10C19.375 10.8 18.3922 11.4594 18.1953 12.1969C17.9922 12.9594 18.5063 14.0219 18.1203 14.6891C17.7281 15.3672 16.5484 15.4484 15.9984 15.9984C15.4484 16.5484 15.3672 17.7281 14.6891 18.1203C14.0219 18.5063 12.9594 17.9922 12.1969 18.1953C11.4594 18.3922 10.8 19.375 10 19.375C9.2 19.375 8.54062 18.3922 7.80312 18.1953C7.04062 17.9922 5.97813 18.5063 5.31094 18.1203C4.63281 17.7281 4.55156 16.5484 4.00156 15.9984C3.45156 15.4484 2.27187 15.3672 1.87969 14.6891C1.49375 14.0219 2.00781 12.9594 1.80469 12.1969C1.60781 11.4594 0.625 10.8 0.625 10C0.625 9.2 1.60781 8.54062 1.80469 7.80312C2.00781 7.04062 1.49375 5.97813 1.87969 5.31094C2.27187 4.63281 3.45156 4.55156 4.00156 4.00156C4.55156 3.45156 4.63281 2.27187 5.31094 1.87969C5.97813 1.49375 7.04062 2.00781 7.80312 1.80469C8.54062 1.60781 9.2 0.625 10 0.625C10.8 0.625 11.4594 1.60781 12.1969 1.80469C12.9594 2.00781 14.0219 1.49375 14.6891 1.87969C15.3672 2.27187 15.4484 3.45156 15.9984 4.00156C16.5484 4.55156 17.7281 4.63281 18.1203 5.31094C18.5063 5.97813 17.9922 7.04062 18.1953 7.80312C18.3922 8.54062 19.375 9.2 19.375 10Z" fill="#2568EF"/>
    <path d="M12.7094 7.20626L9.14065 10.775L7.29065 8.92657C6.88909 8.52501 6.23752 8.52501 5.83596 8.92657C5.4344 9.32814 5.4344 9.9797 5.83596 10.3813L8.43127 12.9766C8.8219 13.3672 9.45627 13.3672 9.8469 12.9766L14.1625 8.66095C14.5641 8.25939 14.5641 7.60782 14.1625 7.20626C13.761 6.8047 13.111 6.8047 12.7094 7.20626Z" fill="#FFFCEE"/>
    </g>
    <defs>
    <clipPath id="clip0_11_290">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    `
        : ""
    }
    </div>
 </div>
  <p class="text-gray-500">${news?.others?.views} views</p>
</div>

</div>`

      cardContainer.appendChild(div);
    });
  }
  // console.log(viewsNewArray);

};
function secondsToHoursMinutes(secs){
  if(!secs){
    return '';
  }
  
  const hours=Math.floor(secs / 3600);
  const minutes=Math.floor((secs % 3600) / 60);

  if(hours>0 && minutes>0){
    return `${hours} hrs ${minutes} mins ago`;
  }
  else if(minutes>0){
    return `${minutes} mins ago`;
  }
  else{
    return `${minutes} mins ago`;
  }
}

handleTube();
handleSort("1000");



