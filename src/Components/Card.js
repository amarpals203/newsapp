import React from 'react';

const Card = ({ data }) => {
  console.log(data);

  const readMore = (url) => {
    window.open(url);
  };

  return (
    <div className='cardContainer'>
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) {
          return null; // Skip items without an image
        } else {
          return (
            <div className='card' key={curItem.url || index}> {/* Added unique key */}
              <img src={curItem.urlToImage} alt={curItem.title} /> {/* Added alt attribute for accessibility */}
              <div className='content'>
                <a 
                  className='title' 
                  href={curItem.url} // Provided valid href for the anchor
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {curItem.title}
                </a>
                <p>{curItem.description}</p>
                <button onClick={() => readMore(curItem.url)}>Read More</button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Card;
