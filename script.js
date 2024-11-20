let r = new XMLHttpRequest();

let main = document.querySelector(".mainPosts");

r.onload = function () {
  if (r.readyState == 4 && r.status == 200) {
    
    let data = JSON.parse(r.responseText);
    console.log(data);
    let posts = data.posts;

  console.log(posts)

    posts.map((ele) => {


      main.innerHTML += `
        <div class="cardDiv">
          <div>
          <h2 class="headerposts">${ele.title}</h2>
            <p class="paragraphposts">${ele.body}</p>
            <button class="copybtn" onclick="copyText('${ele.body}')"><i class="fa-regular fa-copy"></i></button>
          </div>
      
          <div class="tagsDiv">
            ${ele.tags.map(tag => `<span class="tagspan">${tag}</span>`).join('')}
          </div>
        </div>
      `;

    });
  } else {
    console.log("Ther are some Error");
  }
};





let num = Math.ceil(Math.random() * 20);

r.open("GET",`https://dummyjson.com/posts?limit=${num}`, true);
r.send();





function showGets(slug){

  main.innerHTML = ` `
  
  r.open("GET",`https://dummyjson.com/posts/tag/${slug}`, true);
  r.send();
}

function gets() {
  let rGets = new XMLHttpRequest();
  rGets.onload = function () {
    if (rGets.readyState == 4) {
      if (rGets.status == 200) {
        let get = JSON.parse(rGets.responseText);

        let divGets = document.querySelector(".hashTags");

        get.map(function (ele) {
          divGets.innerHTML += `
                    <a class="tags"><span  onclick="showGets('${ele.slug}')"> # ${ele.name} </span></a>
                  `;
        });

      }
    }
  };

  rGets.open("GET",'https://dummyjson.com/posts/tags?limit=10', true);
  rGets.send();
}

gets();




function search(word){
  main.innerHTML = ` `    
  r.open("GET",`https://dummyjson.com/posts/search?q=${word}`, true);
  r.send();

}

let searchI= document.querySelector(".searchInput")

searchI.addEventListener("keypress",()=>{
  search(searchI.value)
})


