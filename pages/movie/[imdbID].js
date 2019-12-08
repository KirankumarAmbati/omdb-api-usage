import React, { useState } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

const Movie = ({ movie }) => {

    return (
        <div className="bg-gray-light p-12">
            <div className="bg-red-300 p-8 flex">
                <img className="p-2 border-black border-2 border-solid" src={movie.Poster} alt={movie.Title} />
                <div className="mx-10">
                    <h1 className="text-4xl">{`${movie.Title} (${movie.Year})`}</h1>
                    <span className="px-3 border-solid border-black border-r-2 border-l-2">{(movie.Type).toUpperCase()}</span>
                    <span className="px-3 border-solid border-black border-r-2">{movie.Genre}</span>
                    <span className="px-3 border-solid border-black border-r-2">{movie.Runtime}</span>
                    <span className="px-3 border-solid border-black border-r-2">{movie.Language}</span><br />
                    <div className="my-2">
                        <span>IMDB: {movie.imdbRating} </span>
                        <span>Rotten Tomatoes: {movie.Ratings[1].Value}</span>
                    </div>
                    <p className="my-2">{movie.Plot}</p>
                    <table>
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
                    </table>
                </div>
            </div>
        </div>
    )
}

Movie.getInitialProps = async function ({ query }) {

    const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${query.imdbID}`);
    const data = await res.json();

    return {
        movie: data
    };
};


export default Movie