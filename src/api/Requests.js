//best practice: store it in {process.env.API_KEY}
const apiKey = 'd8ed69c1b68ba1c9efdd88ea30e0be6b';

const requests={
    fetchTrending:`/trending/all/week?api_key=${apiKey}&language=en-US`,
    fetchNetflixOriginals:`/discover/tv?api_key=${apiKey}&with_networks=213`,
    fetchTopRated:`/movie/top_rated?api_key=${apiKey}&language=en-US`,
    fetchActionMovies:`/discover/movie?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc&with_genres=28`,
    fetchComedyMovies:`/discover/movie?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc&with_genres=35`,
    fetchHorrorMovies:`/discover/movie?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc&with_genres=27`,
    fetchRomanceMovies:`/discover/movie?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749`,
    fetchDocumentaries:`/discover/movie?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc&with_genres=99`
}

export default requests