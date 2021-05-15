import axios from "axios";
import { useEffect, useState } from "react";
import Generes from "../../Generes";
import useGenre from "../../hooks/useGenre";
import CustomPagination from "../../Pagination/CustomPagination";
import SingleContent from "../../SingleContent/SingleContent";

const Series = () => {


    const[page, setPage] = useState(100);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres)

    const fetchMovies = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=490f25e374a7a9132cdee1460a3914c1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
    };

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [page, genreforURL]);

    return (
        <div>
            <span className="pageTitle">TV Series</span>
            <Generes 
                type="tv"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className="trending">
            {
                content&& content.map((c) => (
                    <SingleContent
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type="tv"
                    vote_average={c.vote_average}
                    />))
            }
            </div>
            {numOfPages >1 &&
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            }
        </div>
    )
}

export default Series;
