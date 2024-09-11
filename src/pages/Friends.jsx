import { useEffect, useState } from "react";
import getFriends from "../services/getFriends";
import FriendListFriend from "../components/FriendListFriend";
import "../styles/friends.css";
import search from "../assets/search.svg";
import getSearchUsers from "../services/getSearchUsers";

function Friends() {
  const [friends, setFriends] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [content, setContent] = useState([]);

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
    const response = await getSearchUsers(searchInput);
    setContent(response);
    console.log(response);
    setSearchInput("");
  };

  // on click we should get a list of all users matching searched query in a new modal!
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="friendsContainer">
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
          <div className="searchResults">
            {content.map((item) => (
              <div>{item.username}</div>
            ))}
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
