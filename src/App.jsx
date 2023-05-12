import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
 
  const [image, setImage] = useState([]);
  const [inputText, setInputText] = useState("code"); 

  const api_url = `https://api.unsplash.com/search/photos?page=1&query=${inputText}&client_id=m9k-Or2jliKNXJzTx_eyTS_-mTFfbrwdo1tZtJKNi5I`;


  const inputEvent = (e) => {
    setInputText(e.target.value);
    //  console.log(inputText);
    // console.log(e.target.value);
  };

  const getData = async() => {
    console.log(inputText);
    if (inputText == 0) {
      alert("Enter Keyword to Search Photos");
    } else {  
      await fetch(api_url)
        .then((response) => response.json())
        .then((actualData) => {
          setImage(actualData.results);
        });
    }
    setInputText("");
  };

  useEffect(() => {
    fetch(api_url)
      .then((response) => response.json())
      .then((actualData) => {
        setImage(actualData.results);
      });
      setInputText("");

  }, []);

  return (
    <>
      <div className="Box1">
        <h1>Unsplash Picture Gallery App</h1>

        <div className="Box2">
          <input
            type="text"
            placeholder="Search Photo"
            onChange={inputEvent}
            value={inputText}
          />
          <button className="btn btn-primary" onClick={getData}>
            Search
          </button>
        </div>

        <div className="Box3">
          <div className="row">
            {image.map((value, index) => {
              return (
                <div key={index} className="col-4 my-2">
                  <div className="card">
                    <img
                      src={value.urls.small}
                      className="card-img-top"
                      alt="Images"
                    />
                    <div className="card-body">
                      <p className="card-text">
                        Description: {value.alt_description}
                      </p>
                      <p>
                        Author:{" "}
                        <em>
                          <strong> {value.user.name}</strong>
                        </em>
                      </p>
                      <p>Publish on: {value.created_at.substr(0, 10)}</p>
                      <p>
                        Location:{" "}
                        <strong>
                          {!value.user.location
                            ? "Unknown"
                            : value.user.location}
                        </strong>
                      </p>

                      <a
                        href={value.links.html}
                        rel="noreferrer"
                        target="_blank"
                        className="btn btn-primary"
                      >
                        Goto Unsplash
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
