import axios from "axios";
import {useState, useEffect} from 'react';
import SingleContent from '../../../Components/SingleContent/SingleContent';
import CustomPagination from '../../../Components/Pagination/CustomPagination';
import './Trending.css';

const Trending = () => {

    const [page, setPage] = useState(10);
    const[content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const fetchTrending = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/trending/all/week?api_key=490f25e374a7a9132cdee1460a3914c1&page=${page}`
        );
        console.log(data);

        setContent(data.results);
        setNumOfPages(data.tottal_pages);
    };

    useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line
    }, [page]);

    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
            {
                content&& content.map((c) => (
                    <SingleContent 
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type={c.media_type}
                    vote_average={c.vote_average}
                    />))
            }
            </div>
            <CustomPagination setPage={setPage} numOfPages={10}/>
        </div>
    )
}

export default Trending;
