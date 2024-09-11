import { useEffect, useState } from "react";
import getFriends from "../services/getFriends";
import FriendListFriend from "../components/FriendListFriend";
import "../styles/friends.css";
import search from "../assets/search.svg";
import getSearchUsers from "../services/getSearchUsers";
import SearchUserModal from "../components/SearchUserModal";

function Friends() {
  const [friends, setFriends] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [content, setContent] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const loadFriends = async () => {
      const friends = await getFriends();
      setLoadingFriends(false);
      console.log(friends.friends);
      setFriends(friends.friends);
    };
    loadFriends();
  }, []);

  const handleSearchClick = async () => {
    // if no input return null
    if (searchInput === "") {
      return null;
    }
    setSearchLoading(true);
    const response = await getSearchUsers(searchInput);
    setSearchLoading(false);

    // if no results, return null
    if (response.length === 0) {
      return null;
    }

    setModalVisible(true);
    setContent(response);
    console.log("CONTENT");
    console.log(response);
    setSearchInput("");
  };

  // on click we should get a list of all users matching searched query in a new modal!
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="friendsContainer">
      <SearchUserModal
        result={content}
        visibility={modalVisible}
        setModalVisible={setModalVisible}
      />
      <div className="friendsHeading">
        <h4>Friends</h4>
        <div className="searchBoxButton">
          <div className="outerDivSearch">
            <input
              className="searchFriend"
              type="text"
              placeholder="Search for your friends"
              onChange={(e) => handleSearchInput(e)}
              minLength={1}
              maxLength={15}
              value={searchInput}
            ></input>
            <button className="searchBtnFriend" onClick={handleSearchClick}>
              <img className="buttonIconSearch" src={search} />
            </button>
          </div>
        </div>
      </div>

      <div className="incomingReqs">Incoming reqs will go here</div>
      <div className="allFriends">
        <div className={"loadingFriends " + loadingFriends}>LOADING ...</div>
        {friends.map((friend) => (
          <FriendListFriend
            profilePic={friend.profilePic}
            username={friend.username}
            key={friend.id}
            id={friend.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Friends;
