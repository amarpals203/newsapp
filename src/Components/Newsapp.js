import React, { useEffect, useState, useCallback } from 'react'
import Card from './Card'

const Newsapp = () => {
    const [search, setSearch] = useState("india");
    const [newsData, setNewsData] = useState(null);
    const API_KEY = "5e2c58b681014d3eb906e096f0c23a40";

    // Wrapping getData in useCallback to memoize the function
    const getData = useCallback(async () => {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
            const jsonData = await response.json();
            
            // Ensure jsonData.articles exists
            if (jsonData.articles) {
                let dt = jsonData.articles.slice(0, 10);
                setNewsData(dt);
            } else {
                setNewsData([]);
            }
        } catch (error) {
            console.error("Error fetching the data:", error);
        }
    }, [search]);  // Added `search` as a dependency

    useEffect(() => {
        getData();
    }, [getData]);  // Added `getData` as a dependency

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const userInput = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <nav>
                <div>
                    <h1>Trendy News</h1>
                </div>
                <ul style={{ display: "flex", gap: "11px" }}>
                    {/* Changed <a> to <button> to fix the accessibility warning */}
                    <button style={{ fontWeight: 600, fontSize: "17px" }}>All News</button>
                    <button style={{ fontWeight: 600, fontSize: "17px" }}>Trending</button>
                </ul>
                <div className='searchBar'>
                    <input type='text' placeholder='Search News' value={search} onChange={handleInput} />
                    <button onClick={getData}>Search</button>
                </div>
            </nav>
            <div>
                <p className='head'>Stay Update with TrendyNews</p>
            </div>
            <div className='categoryBtn'>
                <button onClick={userInput} value="sports">Sports</button>
                <button onClick={userInput} value="politics">Politics</button>
                <button onClick={userInput} value="entertainment">Entertainment</button>
                <button onClick={userInput} value="health">Health</button>
                <button onClick={userInput} value="fitness">Fitness</button>
            </div>

            <div>
                {newsData ? <Card data={newsData} /> : <p>No news data available</p>}
            </div>
        </div>
    );
};

export default Newsapp;
