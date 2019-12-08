import React from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

const Movie = ({ movie }) => {
    return (
        <>
            <Link href="/">
                <div className="bg-red-400 cursor-pointer">
                    <span className="text-4xl px-2 bg-yellow-400 mx-4 rounded">OMDB</span>
                </div>
            </Link>
            <div className="bg-gray-light p-8">
                <div className="bg-red-300 p-8 flex">
                    <img className="p-2 border-black border-2 border-solid" src={movie.Poster} alt={movie.Title} />
                    <div className="mx-10 border-black border-2 border-solid p-4">
                        <h1 className="text-4xl px-4 bg-black text-red-400">{`${movie.Title} (${movie.Year})`}</h1>
                        <div className="mt-4 flex">
                            <span className="px-3 flex-grow text-center border-solid border-black border-r-2 border-l-2">{(movie.Type).toUpperCase()}</span>
                            <span className="px-3 flex-grow text-center border-solid border-black border-r-2">{movie.Genre}</span>
                            <span className="px-3 flex-grow text-center border-solid border-black border-r-2">{movie.Runtime}</span>
                            <span className="px-3 flex-grow text-center border-solid border-black border-r-2">{movie.Language}</span>
                        </div>
                        <div className="my-2">
                            <span><b>IMDB:</b> {movie.imdbRating} </span>
                            <span className="float-right"><b>Rotten Tomatoes:</b> {movie.Ratings[1].Value}</span>
                        </div>
                        <p className="my-2 mt-8">{movie.Plot}</p>
                        <table className="mt-8">
                            <tbody>
                                <tr>
                                    <td>
                                        <b>Director</b>
                                    </td>
                                    <td>
                                        {`: ${movie.Director}`}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Producer</b>
                                    </td>
                                    <td>
                                        {`: ${movie.Production}`}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Writer</b>
                                    </td>
                                    <td>
                                        {`: ${movie.Writer}`}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Cast</b>
                                    </td>
                                    <td>
                                        {`: ${movie.Actors}`}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Awards</b>
                                    </td>
                                    <td>
                                        {`: ${movie.Awards}`}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

Movie.getInitialProps = async function ({ query }) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=e2c59e64&i=${query.imdbID}`)
    const data = await res.json()

    return {
        movie: data
    }
}

export default Movie