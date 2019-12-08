import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import useGlobal from "../store"
import "../assets/styles.css"

const Index = () => {
    const [globalState, globalActions] = useGlobal()

    let { movies, searchText, totalResults, page, type, year } = globalState
    let { setSearchText, setPage, setType, setYear } = globalActions

    return (
        <>
            <Link href="/">
                <div className="bg-red-400 cursor-pointer">
                    <span className="text-4xl px-2 bg-yellow-400 mx-4 rounded">OMDB</span>
                </div>
            </Link>
            <div className="bg-grey-light px-12 py-4">
                <div className="mb-4 bg-blue-200 p-4">
                    <p className="text-xl mb-4"><b>Search</b></p>
                    <input
                        className="p-2 block border-2 border-black border-solid"
                        type="text"
                        placeholder="Enter search text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <p className="mt-4"><b>Optional:</b></p>
                    <div className="mt-2">
                        <select className="p-2 border-solid border-black border-2 mr-4" onChange={(e) => setType(e.target.value)} value={type}>
                            <option value='undefined'>--select--</option>
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                            <option value="episode">Episode</option>
                        </select>
                        <input
                            type="text"
                            placeholder="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="border-2 border-black border-solid p-2"
                        />
                        <button
                            className="mx-2 py-2 px-8 text-center border-2 border-red-400 border-solid hover:bg-red-400 hover:text-white"
                            style={searchText === '' ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
                            disabled={searchText === ''}
                            onClick={() => getMoviesBySearch(globalState, globalActions, 'search')}
                        >
                            Search!
                    </button>
                    </div>
                </div>

                {
                    movies && movies.length > 0 && (
                        <div className="mb-8 bg-yellow-300 p-4">
                            Total Pages: {Math.floor(totalResults / 10) + 1}. Go to Page: <input className="p-2 border-black border-solid border-2" type="text" value={page} onChange={(e) => setPage(e.target.value)} />
                            <button
                                className="py-2 px-8 text-center ml-2 border-solid border-red-400 border-2 hover:bg-red-400 hover:text-white"
                                onClick={() => getMoviesBySearch(globalState, globalActions)}
                            >
                                GO
                            </button>
                            <span id="errorMessage" className="invisible text-red-400 ml-4 mt-4">* Enter a page in the given limit and try again!</span>
                        </div>
                    )
                }

                <div className="bg-green-200">
                {
                    movies && movies.length > 0 ? movies.map((movie, index) => (
                        <div className="bg-blue-200 grow inline-block max-w-1/6 min-h-1/2 cursor-pointer border-solid border-2 border-black hover:bg-red-400 hover:border-red-400 m-2" style={{}} key={index}>
                            <Link href="/movie/[imdbID]" as={`/movie/${movie.imdbID}`}>
                                <div>
                                    <img className="p-2" src={movie.Poster} alt={movie.Title} />
                                    <h1 className="text-center text-lg m-2"><b>{`${movie.Title} (${movie.Year})`}</b></h1>
                                </div>
                            </Link>
                        </div>
                    )) : (
                        <p className="mt-12 text-center text-orange-600 text-xl">No results!</p>
                    )
                }
                </div>
                <div>
                    <p className="text-center bg-red-400">{`Crafted with <3 by Kirankumar Ambati`}</p>
                </div>

            </div>
        </>
    )
}

function getMoviesBySearch(globalState, globalActions, param) {

    let { searchText, totalResults, page, type, year } = globalState
    let { setMovies, setTotalResults, setPage } = globalActions

    if(param === 'search') {
        setPage(1)
    }

    let highestPage = Math.floor(totalResults / 10) + 1;

    if (!!page && (totalResults === undefined || page == '' || page <= highestPage)) {
        let url = `http://www.omdbapi.com/?apikey=e2c59e64&s=${searchText}&page=${page}`

        if (type !== undefined && type !== 'undefined') {
            url += '&type=' + type
        }

        if (year !== undefined && year !== '') {
            url += '&y=' + year
        }

        console.log('URL: ', url);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setMovies(data.Search)
                setTotalResults(data.totalResults)
            })
    } else {
        document.getElementById('errorMessage').classList.remove('invisible')

        setTimeout(() => {
            document.getElementById('errorMessage').classList.add('invisible')
        }, 4000);
    }
}

export default Index