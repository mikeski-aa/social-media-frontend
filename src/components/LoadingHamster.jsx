import serverHamster from "../assets/server.gif";
import "../styles/loadinghamster.css";

function LoadingHamster(props) {
  return (
    <>
      <div className="loadingHamsterContainer">
        <img src={serverHamster} className="hamsterImg"></img>Loading{" "}
        {props.text}...
      </div>
    </>
  );
}

export default LoadingHamster;
