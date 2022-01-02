import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
    display : flex;
    flex-direction: column;
    padding : 10px;
    width: 280px;
    background-color: black;
    box-shadow: 0 10px 10px 0 black;
    cursor: pointer;
`;

const CoverImage = styled.img`
    height: 360px;
    object-fit: cover;
    // background-size: cover;
    // background-image: url('/avengersendgame.jpg');
`;

const MovieName = styled.span`
    font-size: 18px;
    font-weight: 600;
    color : white;
    margin : 15px 0;
    white-space: no-wrap;
    text-overflow: ellipsis;
    overflow : hidden;
`;

const InfoRow = styled.div`
    display:flex;
    flex-direction : row;
    justify-content : space-between;
`

const InfoMovie = styled.span`
    font-size: 16px;
    font-weight : 500;
    color: white;
    white-space: no-wrap;
    text-transform: capitalize;
    text-overflow: ellipsis;
    overflow : hidden;
`
const Movie = (props) => {

    const{ Title, Year, imdbID, Type, Poster} = props.movie;

    return (
        <MovieContainer onClick={ ()=> props.onMovieSelect(imdbID)} >
            <CoverImage src={Poster}/>
            <MovieName>{Title}</MovieName>
            <InfoRow>
                <InfoMovie>Year: {Year}</InfoMovie>
                <InfoMovie>Type : {Type}</InfoMovie>
            </InfoRow>
        </MovieContainer>
    );
}
export default Movie;