
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const  apiEl = document.getElementById("api-root") 
const errorEl = document.getElementById("error")


const displayMovies = async ()=> {
    errorEl.innerHTML = ""
 
    const response = await fetch(`https://www.omdbapi.com/?apikey=fe4f906&s=${searchInput.value}`)
    const data = await response.json()
    
    try{
        throw (data.Search)
    
            errorEl.innerHTML = `` 
            errorEl.classList.remove("error-message")
        
    }
    catch(error){
         if (error === undefined){
          errorEl.classList.add("error-message")
          errorEl.innerHTML = `<div id = "error">
          <h1 class ="error-message"> Unable to find what you're looking for. Please try another search.</h1></div>`
          } else {
            errorEl.innerHTML = `` 
            errorEl.classList.remove("error-message")
          }
    }
   searchInput.value = ""
    apiEl.innerHTML = ``

    const moviesArray = []
    for (let i = 0; i < data.Search.length; i++) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=fe4f906&i=${data.Search[i].imdbID}`)
        const dat = await res.json()
        moviesArray.push(dat)

        let html =""
         const {Poster, Title, Rated, Year, Genre, Plot, Runtime ,imdbRating,imdbID} = dat
                                                        
                                         html+=`<div  class="container"> 
                                                        <img src="${Poster}"> 
                                                
                                                <div class = "container-info">
                                                        <div class= "title-imdb">
                                                                <p>${Title}</p>
                                                                <p class= "layout">⭐️${imdbRating}</p>
                                                        </div>
                                                        <div class= "runtime-genre">
                                                                <p>${Runtime}</p>
                                                                <p class = "layout">${Genre}</p>
                                                                <div class= "div-watch-btn">
                                                                <a " 
                                                                id ="${imdbID}" 
                                                                class= "add icon-alone" ><span aria-hidden="true" data-icon="&#x002b;"></span>
                                                                <span class="screen-reader-text">RSS
                                                                </span>
                                                                 Watchlist
                                                                </a> 
                                                                <a id = "remove" class="remove" hidden>Remove</a>
                                                                </div>
                                                        </div>
                                                        <div class = "rating-year">
                                                                <p>Rated: ${Rated}</p>
                                                                <p class = "layout">Year: ${Year}</p>
                                                        </div>
                                                        
                                                 <div class="plot">
                                                                <p>${Plot}</p>
                                                        </div>
                                                </div>
                                               
                                                 </div>`                   
                                        apiEl.innerHTML += html
        let addWatchlist = document.getElementsByClassName("add")

        for (let i = 0; i < addWatchlist.length; i++) {
            addWatchlist[i].addEventListener("click", ()=> {
             
                const moviesLocalStorage = JSON.parse(localStorage.getItem("myMovies"))
                
                if (moviesLocalStorage === null) {
                    localStorage.setItem("myMovies", JSON.stringify([moviesArray[i]]))
                    }
                        else {
                            localStorage.setItem("myMovies", JSON.stringify([...moviesLocalStorage, moviesArray[i]]))
                        }
            })
        }
    }

    
            
}

searchBtn.addEventListener("click", displayMovies)
searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
         e.preventDefault();
         displayMovies();
      }})
