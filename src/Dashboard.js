import React from "react";
import { useEffect, useState } from "react";
import "./dashboard.css";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Dashboard() {
  const [image, setImage] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const style = {
    height: "100px",
    backgroundColor: "Black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "8px"
  };
  const input = {
    margin: "10px",
    width: "300px",
    padding: "2px",
    border: "none"
  };
  const button = {
    padding: "2px",
    paddingRight: "10px",
    paddingLeft: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none"
  };
  const image_board = {
    display: "grid",
    gridTemplateColumns: "repeat(4,300px)"
  };
  var [item, setItem] = useState("");
  function setInput(event) {
    setItem(event.target.value);
  }
  function setValue() {
    let value = document.getElementById("input").value;
    //console.log("inside setValue",value);
    if (value !== "") {
      fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ad6bb9caaa98b60ad7b12cc976aa7f7b&text=${value}&format=json&nojsoncallback=1`
      )
        .then((a) => a.json())
        .then((b) => setImage(b.photos.photo));
    }
    // document.getElementById("input").value = "";
    // item = "";
  }
  function fetchData() {
    console.log("hello");
    fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ad6bb9caaa98b60ad7b12cc976aa7f7b&format=json&nojsoncallback=1"
    )
      .then((a) => a.json())
      .then((a) => setImage([...image, ...a.photos.photo]));
  }
  return (
    <div>
      <div style={style}>
        <h3 style={{ color: "white" }}>Search Photos</h3>
        <input
          id="input"
          style={input}
          type="text"
          placeholder="Search Image"
          value={item}
          onChange={setInput}
        />
        <button style={button} onClick={setValue}>
          Search
        </button>
      </div>
      <div>
        <InfiniteScroll
          dataLength={image.length}
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {image.map((item, index) => {
            let server_id = item.server;
            let id = item.id;
            let secret = item.secret;
            let add =
              "https://live.staticflickr.com/" +
              server_id +
              "/" +
              id +
              "_" +
              secret +
              "_m.jpg";
            return <img id="img" key={index} src={add} alt="flickr_image" />;
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
