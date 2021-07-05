import { useState } from "react";

export default function Searchbar(props) {
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
  //console.log(props.value)
  var [item, setItem] = useState("");
  function setInput(event) {
    setItem(event.target.value);
  }
  function setValue() {
    let value = document.getElementById("input").value;
    //console.log("inside setValue",value);
    props.value(value);
    document.getElementById("input").value = "";
    item = "";
  }
  return (
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
  );
}
