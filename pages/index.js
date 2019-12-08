import React, { useState } from 'react'
import Link from 'next/link'

import fetch from 'isomorphic-unfetch'

import "../assets/styles.css"

const Index = () => {

    let [movies, setMovies] = useState([]);
    let [searchText, setSearchText] = useState("");
    let [totalResults, setTotalResults] = useState(0);
    let [page, setPage] = useState(1);

    // const movies = [{ "Title": "Million Dollar Baby", "Year": "2004", "imdbID": "tt0405159", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTkxNzA1NDQxOV5BMl5BanBnXkFtZTcwNTkyMTIzMw@@._V1_SX300.jpg" }, { "Title": "Baby Driver", "Year": "2017", "imdbID": "tt3890160", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjM3MjQ1MzkxNl5BMl5BanBnXkFtZTgwODk1ODgyMjI@._V1_SX300.jpg" }, { "Title": "Gone Baby Gone", "Year": "2007", "imdbID": "tt0452623", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BYmM2NDNiNGItMTRhMi00ZDA2LTgzOWMtZTE2ZjFhMDQ2M2U5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" }, { "Title": "Rosemary's Baby", "Year": "1968", "imdbID": "tt0063522", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZmEwZGU2NzctYzlmNi00MGJkLWE3N2MtYjBlN2ZhMGJkZTZiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" }, { "Title": "The Boss Baby", "Year": "2017", "imdbID": "tt3874544", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTg5MzUxNzgxNV5BMl5BanBnXkFtZTgwMTM2NzQ3MjI@._V1_SX300.jpg" }, { "Title": "Bridget Jones's Baby", "Year": "2016", "imdbID": "tt1473832", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjQyMTI0MjIyOV5BMl5BanBnXkFtZTgwMzEyMjQ1ODE@._V1_SX300.jpg" }, { "Title": "Bringing Up Baby", "Year": "1938", "imdbID": "tt0029947", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMmVkOTRiYmItZjE4NS00MWNjLWE0ZmMtYzg5YzFjMjMyY2RkXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg" }, { "Title": "Cry-Baby", "Year": "1990", "imdbID": "tt0099329", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BOGY3MzAyZDQtYTYyMS00ODI1LWEwYTEtMjU5MGFjZTYxZmQ4XkEyXkFqcGdeQXVyMjA0MzYwMDY@._V1_SX300.jpg" }, { "Title": "Baby", "Year": "2015", "imdbID": "tt3848892", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BYTdhNjBjZDctYTlkYy00ZGIxLWFjYTktODk5ZjNlMzI4NjI3XkEyXkFqcGdeQXVyMjY1MjkzMjE@._V1_SX300.jpg" }, { "Title": "What Ever Happened to Baby Jane?", "Year": "1962", "imdbID": "tt0056687", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZmI0M2VmNTgtMWVhYS00Zjg1LTk1YTYtNmJmMjRkZmMwYTc2XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg" }]

    // if(localStorage['movies']) {
    //     setMovies(localStorage['movies'])
    // }

    // if(localStorage['searchText']) {
    //     setSearchText(localStorage['searchText'])
    // }

    // if(localStorage['totalResults']) {
    //     setTotalResults(localStorage['totalResults'])
    // }

    // if(localStorage['page']) {
    //     setPage(localStorage['page'])
    // }


    return (
        <div className="bg-grey-light p-12">
            <div>
                <input className="border-2 border-black border-solid" type="text" onInput={(e) => setSearchText(e.target.value)} />
                <button className="mx-2 px-2 border-2 border-red-300 border-solid hover:bg-red-300 hover:text-white" onClick={() => getMoviesBySearch(searchText, setMovies, setTotalResults, page)}>Search!</button>
            </div>

            {
                movies.length > 0 && (
                    <div>
                        Total Pages: {Math.floor(totalResults / 10) + 1}. Go to Page: <input className="border-black border-solid border-2" type="text" value={page} onInput={(e) => setPage(e.target.value)} />
                        <button className="ml-2 px-1 border-solid border-red-300 border-2 hover:bg-red-300 hover:text-white" onClick={() => getMoviesBySearch(searchText, setMovies, setTotalResults, page)}>GO</button>
                    </div>
                )
            }


            {
                movies.length > 0 && movies.map(movie => (
                    <div className="inline-block max-w-1/6 min-h-1/2 cursor-pointer border-solid border-2 border-black hover:bg-red-300 hover:border-red-300 m-2">
                        <Link href="/movie/[imdbID]" as={`/movie/${movie.imdbID}`}>
                            <div>
                                <img className="p-2" src={movie.Poster} alt={movie.Title} />
                                <h1 className="text-center text-lg m-2">{`${movie.Title} (${movie.Year})`}</h1>
                            </div>
                        </Link>
                    </div>
                ))
            }

        </div>
    )
}

function getMoviesBySearch(searchText, setMovies, setTotalResults, page) {
    fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchText}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            // localStorage.setItem('movies', data.Search);
            // localStorage.setItem('searchText', searchText);
            // localStorage.setItem('totalResults', data.totalResults);
            // localStorage.setItem('page', page);
            setMovies(data.Search)
            setTotalResults(data.totalResults)
        })
}


export default Index

// class Index extends React.Component {
//     constructor(props) {
//         super(props)

//         // let [movies, setMovies] = useState([]);
//         // let [searchText, setSearchText] = useState("");
//         // let [totalResults, setTotalResults] = useState(0);
//         // let [page, setPage] = useState(1);

//         this.state = {
//             movies: [],
//             searchText: '',
//             totalResults: 0,
//             page: 1
//         }
//     }

//     componentDidMount() {
//         if(localStorage['movies']) {
//             this.setState({
//                 movies: localStorage['movies']
//             })
//         }

//         if(localStorage['searchText']) {
//             this.setState({
//                 movies: localStorage['searchText']
//             })
//         }

//         if(localStorage['totalResults']) {
//             this.setState({
//                 movies: localStorage['totalResults']
//             })
//         }

//         if(localStorage['page']) {
//             this.setState({
//                 movies: localStorage['page']
//             })
//         }
//     }

//     getMoviesBySearch (searchText, setMovies, setTotalResults, page) {
//         fetch('http://www.omdbapi.com/?apikey=' + searchText + '&page=' + page)
//             .then(response => response.json())
//             .then(data => {
//                 localStorage.setItem('movies', data.Search);
//                 localStorage.setItem('searchText', searchText);
//                 localStorage.setItem('totalResults', data.totalResults);
//                 localStorage.setItem('page', page);
//                 // setMovies(data.Search)
//                 // setTotalResults(data.totalResults)

//                 this.setState({
//                     movies: data.Search,
//                     totalResults: data.totalResults
//                 })
//             })
//     }

//     render() {
//         let { movies, searchText, page, totalResults } = this.state;

//         if (movies.length > 0) {
//             return (
//                 <div className="bg-grey-light p-12">
//                     <div>
//                         Total Pages: {totalResults / 10}. Go to Page: <input className="border-black border-solid border-2"type="text" value={page} onInput={(e) => this.setState({page: e.target.value})} />
//                         <button className="ml-2 px-1 border-solid border-black border-2 hover:bg-black hover:text-white" onClick={() => this.getMoviesBySearch(searchText, '', '', page)}>GO</button>
//                     </div>

//                     {
//                         movies && movies.map(movie => (
//                             <div className="inline-block max-w-1/6 min-h-1/2 cursor-pointer border-solid border-2 border-black hover:bg-red-300 hover:border-red-300 m-2">
//                                 <Link href="/movie/[imdbID]" as={`/movie/${movie.imdbID}`}>
//                                     <div>
//                                         <img className="p-2" src={movie.Poster} alt={movie.Title} />
//                                         <h1 className="text-center text-lg m-2">{`${movie.Title} (${movie.Year})`}</h1>
//                                     </div>
//                                 </Link>
//                             </div>
//                         ))
//                     }

//                 </div>
//             )
//         } else {
//             return (
//                 <div>
//                     <input className="border-2 border-black border-solid" type="text" onInput={(e) => this.setState({ searchText: e.target.value})} />
//                     <button onClick={() => this.getMoviesBySearch(searchText, '', '', page)}>Search!</button>
//                 </div>
//             )
//         }
//     }
//   }

// export default Index