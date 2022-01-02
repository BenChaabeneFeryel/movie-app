import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Movie from './Components/Movie';
import MovieInfoComponent from "./Components/MovieInfoComponent";

export const API_KEY= "446c6e79";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: #141414;
  color: #D81F26;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 50px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 60px;
  margin-left: 20px;
  width: 50%;
  background-color: #141414;
  border-color: 15px white;
  box-shadow: 0 0 0 2px white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 60px;
  height: 60px;
  margin: 15px;
`;
const SearchInput = styled.input`
  background-color : #141414;
  color: darkgrey;
  font-size: 16px;
  border: none;
  outline: none;
  margin-left: 15px;
  cursor: text;
  caret-color: white; 
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 30px;
  gap: 25px;
`;


function App() {

  const [searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchdata= async (searchString)=>{
    const response= await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    console.log(response);
    updateMovieList(response.data.Search); 
  }  
  const onTextChange =(event) =>{
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout( 
      ()=> fetchdata(event.target.value), 500);
    updateTimeoutId(timeout);
  }

  return (
    <Container >

      <Header>
        <AppName>
          <MovieImage src="/netflix_PNG10.png"></MovieImage>
           Netflix
        </AppName>
        <SearchBox>
          <SearchIcon src="/outline_search_white_24dp.png"></SearchIcon>
          <SearchInput placeholder="Search movie/series" 
          value={searchQuery} onChange={onTextChange}></SearchInput>
        </SearchBox>
      </Header>

      {selectedMovie && <MovieInfoComponent 
      selectedMovie={selectedMovie} 
      onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length? movieList.map ( (movie, index)=> (
        <Movie key={index} movie={movie} 
        onMovieSelect={onMovieSelect} />)  ) 
        :<p>No Movie or Series Search</p>
        }
      </MovieListContainer>
    </Container>
  );
}

export default App;
