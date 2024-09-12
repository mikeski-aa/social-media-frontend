import { createContext, useEffect, useState } from "react";
import getFriends from "../services/getFriends";
import FriendListFriend from "../components/FriendListFriend";
import "../styles/friends.css";
import search from "../assets/search.svg";
import getSearchUsers from "../services/getSearchUsers";
import SearchUserModal from "../components/SearchUserModal";
import getIncomingRequests from "../services/getRequests";
import FriendRequestModal from "../components/FriendRequestModal";

export const FriendsContext = createContext();

//TODO: INVESTIGATE DOUBLE LOADING of current friends on page load
function Friends() {
  const [friends, setFriends] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [content, setContent] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [searchErrorMsg, setSearchErrorMsg] = useState("");
  const [requests, setRequests] = useState([]);
  const [reqVisibility, setReqVisibility] = useState(false);
  const [forceloadFriends, setForceLoadFriends] = useState(0);
  // previous search is required to allow us to refresh results when accepting or sending requests!
  const [previousSearch, setPreviousSearch] = useState("");

  // load friends when the friends page is rendered
  // combinging loading friends with loading requests
  // using await promise all to load both concurrently instead of doing them one at a time
  useEffect(() => {
    const loadFriends = async () => {
      const [friends, requests] = await Promise.all([
        getFriends(),
        getIncomingRequests(),
      ]);
      setLoadingFriends(false);
      console.log(friends.friends);
      setFriends(friends.friends);
      setRequests(requests);
    };
    loadFriends();
  }, [forceloadFriends]);

  const handleSearchClick = async () => {
    // if no input return null
    if (searchInput === "") {
      setSearchErrorMsg("No results found");
      setSearchError(true);
      return null;
    }
    setSearchLoading(true);
    const response = await getSearchUsers(searchInput);
    setSearchLoading(false);

    // if no results, return null
    if (response.length === 0) {
      setSearchErrorMsg("No results found");
      setSearchError(true);
      return null;
    }
    setPreviousSearch(searchInput);
    setSearchErrorMsg("");
    setSearchError(false);
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

  // handle friend request modal open
  const handleRequestsOpen = () => {
    setReqVisibility(true);
    console.log(requests);
  };

  return (
    <div className="friendsContainer">
      <FriendsContext.Provider
        value={{ forceloadFriends, setForceLoadFriends, previousSearch }}
      >
        <SearchUserModal
          result={content}
          visibility={modalVisible}
          setModalVisible={setModalVisible}
        />
        <FriendRequestModal
          visibility={reqVisibility}
          setReqVisibility={setReqVisibility}
          result={requests}
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
              <div className={"searchErrorBox " + searchError}>
                {searchErrorMsg}
              </div>
              <div className={"searchLoading " + searchLoading}>
                Searching...
              </div>
            </div>
          </div>
        </div>

        <button className="incomingReqs" onClick={handleRequestsOpen}>
          Friend requests {requests.length}
        </button>
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
      </FriendsContext.Provider>
    </div>
  );
}

export default Friends;
