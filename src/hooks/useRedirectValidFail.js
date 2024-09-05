import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router";

// custom hook to check for validation; otherwise redirect to login page

function useRedirectValidFail(error) {
  const navigate = useNavigate();
  useEffect(() => {
    if (error === true) {
      return navigate("/login");
    }

    return () => {};
  });
}

export default useRedirectValidFail;
