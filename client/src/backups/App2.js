import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';


function App() {
  const listings = [
    { id:1, title: 'pic1', image: '/public/pic1.jpg' },
    { id:2, title: 'pic2', image: '/public/pic2.jpg' },
    { id:3, title: 'pic3', image: '/public/pic3.jpg' },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Step Into 5236 Malta Street</h1>
        </header>
        <main>
          <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            >
            {listings.map(listing => (
              <div key={listing.id}>
                <img src={listing.image} alt={listing.title} />
                <p className="legend">{listing.title}</p>
              </div>
            ))}
          </Carousel>
        </main>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
}

export default App;
