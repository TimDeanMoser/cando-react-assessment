import {getMovies} from "../axios/wookie";
import {useQuery} from "react-query";
import {Button, Image, Result, Spin} from "antd";
import "./Movies.css"
import Details from "./Details";
import {useSearchParams} from "react-router-dom"
import {useMemo} from "react";


const Genre = ({movies, name}) => {
    return <div style={{position: "relative", overflowX: "hidden"}}>
        <h1>{name}</h1>
        <div style={{display: "flex", width: "100vw", overflowX: "auto", overflowY: "hidden"}}>
            {movies.map(m => <Movie data={m} key={m.id+"_movie"}/>)}
        </div>
        <div className={"gradient"}/>
    </div>
}

const Movie = ({data}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const details = searchParams.get("d")
    return <>
        <Details data={data} open={details === data.slug} close={() => {
            searchParams.delete("d");
            setSearchParams(searchParams);
        }}/>
        <Image
            key={data.id}
            preview={{visible: false, mask: <p style={{padding: "10px"}}>{data.title}</p>}}
            style={{width: "calc((100vw / 4) - 2rem)", boxShadow: "inset 0 0 200px #000000"}}
            src={data.backdrop}
            onClick={() => {
                searchParams.append("d", data.slug)
                setSearchParams(searchParams)
            }}
        />
    </>
}

const Movies = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {data, isLoading, error} = useQuery(
        ["movies", searchParams.get('q') ?? ""],
        () => getMovies(searchParams.get('q') ?? ""),
        {}
    );
    const moviesByGenre = useMemo(() => {
        if (!data) return {};
        return data.movies?.reduce(function (r, a) {
            // Group by single genres
            for (let genreIndex in a.genres) {
                let genre = a.genres[genreIndex]
                r[genre] = r[genre] || [];
                r[genre].push(a);
            }
            // Group by 'all genres'
            // const genre = a.genres
            // r[genre] = r[genre] || [];
            // r[genre].push(a);
            return r;
        }, Object.create(null));
    }, [data]);
    if (isLoading || error) {
        return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "70vh"}}>
            {isLoading ? <Spin/> : <Result
                status="500"
                title="Sorry, something went wrong."
                subTitle="Try refreshing the page"
            />}
        </div>
    }
    return <div style={{padding: "0 1rem"}}>
        {moviesByGenre && Object.entries(moviesByGenre).map(([genre, movies]) => {
            return <Genre name={genre} movies={movies} key={genre}/>
        })}
    </div>
}
export default Movies;
