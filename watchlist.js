const watchlistMain = document.getElementById("watchlist-main")
const moviesLocalStorage = JSON.parse(localStorage.getItem("myMovies")) || [] 



const renderWatchlistMovies = ()=> {
  

 try{
     throw (moviesLocalStorage) 
    watchlistMain.classList.remove("original")

     
 }  catch (error){
     if (moviesLocalStorage === null || []){
         watchlistMain.classList.add("original")
    
         watchlistMain.innerHTML = `<div id ="original-parent">
        <h2 id = "original" class="original">Your watchlist is looking a little empty...</h2>
        <a id = "originallink" class="original" href="index.html">Let's add some movies!</a></div>`
         
     }else {
        watchlistMain.classList.remove("original")
         watchlistMain.innerHTML = ""
        
     }
     
 }
  
        
        for (let i = 0; i < moviesLocalStorage.length; i++) {
            const {Poster, Title, imdbRating, Genre, Rated, Runtime,Year, Plot} =
             moviesLocalStorage[i]
    
            watchlistMain.innerHTML +=   `<div id ="content" class="container"> 
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
                                                                <a  
                                                                class= "add" hidden>
                                                                 Watchlist
                                                                </a> 
                                                                <a  id = "remove" class="remove icon-alone">
                                                                 <span aria-hidden="true"  	
                                                                data-icon="&#x2297;"></span>
                                                                <span class="screen-reader-text">RSS</span>Remove</a>
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
        } 
        }

renderWatchlistMovies()

const removeWatchlist = document.getElementsByClassName("remove")

for (let i = 0; i < removeWatchlist.length; i++) {
    removeWatchlist[i].addEventListener("dblclick", ()=> {
        let watchlistArray = moviesLocalStorage.splice(i,1)
        localStorage.setItem("myMovies", JSON.stringify(moviesLocalStorage))
        renderWatchlistMovies()
    })
}