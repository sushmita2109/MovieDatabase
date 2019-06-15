import React from 'react';
import {Component} from 'react';
import './App.css';
import MovieRow from './MovieRow.js'; 
import $ from 'jquery';

class App extends Component {
  constructor(props){
  super(props)
  this.state ={}
 // console.log("This is my initializer")
//   const movies=[
//     {id:0,poster_src: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",title:"Avenger",overview:"hehehe"},
//     {id:1,poster_src: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/z9RHyAvshVHgJE5Qe7Iu3EmxFgU.jpg",title:"Avenger1",overview:"haheha"}
//   ]
  
// var movieRows=[]
// movies.forEach((movie)=>{
//   console.log(movie.title)
//   const movieRow=<MovieRow movie={movie}/>
  
//   movieRows.push(movieRow)
// })
// this.state = {rows: movieRows}
//this.performSearch("avenger")
  }
  performSearch(searchTerm){
    console.log("Perform Search Using MovieDB")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=91d7d40ef6cd4a35e4b291baa77dd09a&query=" + searchTerm
    $.ajax({
    url: urlString,
    success: (searchResults)=>{
    console.log("Fetched data sucessfully")
    //console.log(searchResults)
    const results=searchResults.results
    //console.log(results)
    var movieRows = []
    results.forEach((movie) => {
      movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
      //console.log(movie.poster_path)
      const movieRow = <MovieRow key={movie.id} movie={movie}/>
      movieRows.push(movieRow)
    })
    this.setState({rows: movieRows})
    },
    error: (xhr,status,err) => {
    console.error("Failed to fetch data")
    }
    
    })
  }
  searchChangeHandler(event){
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }
  render() {
  return (
    <div >
      <table className="titleBar">
        <tbody>
          <tr>
            <td>
              <img alt="app icon" width="50" src="primary_green.svg"/>
            </td>
            <td width="8"/>
            <td>
              <h1>MovieDb Search</h1>
            </td>
          </tr>
        </tbody>
      </table>
      <input style={{
        fontSize: 24,
        display: 'block',
        width: '99%',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16
      }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter Search Term"/>
      {this.state.rows}
    </div>

  );
 }
}

export default App;
