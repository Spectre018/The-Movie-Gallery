import axios from "axios";
import { useEffect } from "react";
import Chip from '@material-ui/core/Chip';


const Generes = ({
    type,
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setPage,
}) => {

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    }

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const fetchGeneres = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=490f25e374a7a9132cdee1460a3914c1&language=en-US`
        );
        setGenres(data.genres);
    };

    console.log(genres);
    useEffect(() => {
        fetchGeneres();

        return () =>
        {
            setGenres({});
        };
        // eslint-disable-next-line
        
    }, [])
    return (
        <div>
            <span style={{padding: "6px 0" }}>
            { selectedGenres &&
                selectedGenres.map((genre)=> (
                <Chip
                    label={genre.name} 
                    style={{margin: 2}} 
                    key={genre.id} 
                    size="small" 
                    color= "primary"
                    clickable
                    onDelete = {() => handleRemove(genre)}
                 />
            ))}
                { genres &&
                    genres.map((genre)=> (
                    <Chip
                        label={genre.name} 
                        style={{margin: 2}} 
                        key={genre.id} 
                        size="small" 
                        clickable
                        onClick={() => handleAdd(genre)}
                     />
                ))}
            </span>
        </div>
    )
}

export default Generes;
