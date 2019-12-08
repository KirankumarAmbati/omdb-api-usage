import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import useGlobal from "../store"
import "../assets/styles.css"

const Index = () => {
    const [globalState, globalActions] = useGlobal()

    let { movies, searchText, totalResults, page } = globalState
    let { setMovies, setSearchText, setTotalResults, setPage } = globalActions

    return (
        <>
            <Link href="/">
                <div className="bg-red-400 cursor-pointer">
                    <span className="text-4xl px-2 bg-yellow-400 mx-4 rounded">OMDB</span>
                </div>
            </Link>
            <div className="bg-grey-light px-12 py-4">
                <div className="mb-4">
                    <input
                        className="border-2 border-black border-solid"
                        type="text"
                        placeholder="Enter search text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        className="mx-2 px-2 border-2 border-red-400 border-solid hover:bg-red-400 hover:text-white"
                        onClick={() => getMoviesBySearch(searchText, setMovies, setTotalResults, page)}
                    >
                        Search!
                    </button>
                </div>

                {
                    movies.length > 0 && (
                        <div>
                            Total Pages: {Math.floor(totalResults / 10) + 1}. Go to Page: <input className="border-black border-solid border-2" type="text" value={page} onChange={(e) => setPage(e.target.value)} />
                            <button
                                className="ml-2 px-1 border-solid border-red-400 border-2 hover:bg-red-400 hover:text-white"
                                onClick={() => getMoviesBySearch(searchText, setMovies, setTotalResults, page)}
                            >
                                GO
                            </button>
                        </div>
                    )
                }

                {
                    movies.length > 0 && movies.map((movie, index) => (
                        <div className="bg-blue-200 grow inline-block max-w-1/6 min-h-1/2 cursor-pointer border-solid border-2 border-black hover:bg-red-400 hover:border-red-400 m-2" style={{}} key={index}>
                            <Link href="/movie/[imdbID]" as={`/movie/${movie.imdbID}`}>
                                <div>
                                    <img className="p-2" src={movie.Poster} alt={movie.Title} />
                                    <h1 className="text-center text-lg m-2"><b>{`${movie.Title} (${movie.Year})`}</b></h1>
                                </div>
                            </Link>
                        </div>
                    ))
                }

            </div>
        </>
    )
}

function getMoviesBySearch(searchText, setMovies, setTotalResults, page) {
    fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchText}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            setMovies(data.Search)
            setTotalResults(data.totalResults)
        })
}

export default Index