import loadingServer from "../assets/server.gif";
import "../styles/creatingusermodal.css";

function CreatingUserModal() {
  return (
    <div className="modalContainer">
      <div className="modalContent">
        <img src={loadingServer} className="loadingServerGif" />
        Creating your profile...
      </div>
    </div>
  );
}

export default CreatingUserModal;
