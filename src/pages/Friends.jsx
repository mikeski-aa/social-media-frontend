import { createContext, useContext, useEffect, useState } from "react";
// import getFriends from "../services/deprecated_friends_calls/getFriends";
import { getFriends } from "../services/friendsCalls";
import FriendListFriend from "../components/FriendListFriend";
import "../styles/friends.css";
import search from "../assets/search.svg";
import { getSearchUsers } from "../services/userCalls";
// import getSearchUsers from "../services/getSearchUsers";
import SearchUserModal from "../components/SearchUserModal";
// import getIncomingRequests from "../services/deprecated_request_calls/getRequests";
import { getIncomingRequests } from "../services/requestCalls";
import FriendRequestModal from "../components/FriendRequestModal";
import useRedirectValidFail from "../hooks/useRedirectValidFail";
import { AuthContext } from "../App";
import LoadingHamster from "../components/LoadingHamster";

export const FriendsContext = createContext();

function Friends() {
  const authContext = useContext(AuthContext);
  useRedirectValidFail(authContext.err);
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
      setFriends(friends.friends);
      setRequests(requests);
    };
    loadFriends();
  }, [forceloadFriends]);

  const handleSearchClick = async () => {
    setSearchError(false);
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
          <h4 className="friendPageHeadingFour">Friends</h4>
          <div className="searchBoxButton">
            <div className="outerDivSearch">
              <div className="searchInputAndBtn">
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
              <div className={"searchErrorBox " + searchError}>
                {searchErrorMsg}
              </div>
              <div className={"searchLoading " + searchLoading}>
                Searching...
              </div>
            </div>
          </div>
        </div>

        {requests.length < 1 ? null : (
          <button className="incomingReqs" onClick={handleRequestsOpen}>
            Friend request: {requests.length}
          </button>
        )}

        <div className="allFriends">
          <div className={"loadingFriends " + loadingFriends}>
            <LoadingHamster text="friends" />
          </div>
          {friends.map((friend) => (
            <FriendListFriend
              profilePic={friend.profilePic}
              username={friend.username}
              key={friend.id}
              id={friend.id}
            />
          ))}
          {friends.length == 0 && loadingFriends === false ? (
            <div className="emptyFriendsDiv">Your friend list is empty</div>
          ) : null}
        </div>
      </FriendsContext.Provider>
    </div>
  );
}

export default Friends;
