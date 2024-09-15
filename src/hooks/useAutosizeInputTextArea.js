import { useEffect } from "react";

function useAutosizeInputTextArea(textAreaRef, val) {
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, val]);
}

export default useAutosizeInputTextArea;
