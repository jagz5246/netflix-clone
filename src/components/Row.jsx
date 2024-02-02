import axios from '../api/axios'
import React, { useEffect, useState } from 'react'
import '../styles/Row.css'
import Loader from './Loader'

const Row = ({title, fetchUrl, isLargeRow}) => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)

    const base_url = "https://image.tmdb.org/t/p/original/";
    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true)
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            setLoading(false)
            return request
        }
        fetchData();
    },[fetchUrl])
  return (
    <div className='row'>
        <h2>{title}</h2>
        {loading ? <Loader /> : 
        <div className="row__posters">
        {movies?.map((movie)=>(
            (isLargeRow && movie.poster_path || 
            !isLargeRow && movie.backdrop_path) && (
            <img key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
            isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.title} />
        )))}
        </div>}
    </div>
  )
}

export default Row
