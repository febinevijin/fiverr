import React from 'react'
import Featured from '../../components/featured/Featured';
import Slides from '../../components/slides/Slides';
import TrustedBy from '../../components/trusetdBy/TrustedBy';
import "./Home.scss";
import { cards } from "../../data";
import CatCard from '../../components/catCard/CatCard';

const Home = () => {
  return (
    <div>
      <Featured />
      <TrustedBy />
      <Slides slidesToShow={5} arrowsScroll={3}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slides>
    </div>
  );
}

export default Home
