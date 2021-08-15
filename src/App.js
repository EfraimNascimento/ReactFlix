import {React, useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';
import './App.css'
// eslint-disable-next-line
export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() =>{
    const loadAll = async () => {
      //pegando toda a lista

      let list = await Tmdb.getHomeList();
      setMovieList(list);
      console.log(list)

      //pegando o feature

      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');  
      setFeaturedData(chosenInfo);      
    }

    loadAll();
  },[]);

  useEffect(() =>{
    const scrollListener = () => {
        if(window.scrollY > 10){
          setBlackHeader(true);
        }else{
          setBlackHeader(false);
        }
    }

    window.addEventListener('scroll', scrollListener)

    return () =>{
      window.removeEventListener('scroll', scrollListener)
    }
  }, []);

  return (
    <div className="page">

       <Header black={blackHeader}/>

      {featuredData &&
        <FeatureMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> pela B7Web <br/>
        Direitos de imagem para Netflix <br/>
        Dados pegos do site Themoviedb.org
      </footer>
    </div>
  )
}