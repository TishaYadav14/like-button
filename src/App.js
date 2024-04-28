import "./App.css";
import { useState } from "react";
import { HeartIcon, SpinnerIcon } from "./utils/icons";

function App() {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const handleLikeUnlike = async () => {
    setIsFetching(true);
    setError("");

    try {
      const response = await fetch("https://www.greatfrontend.com/api/questions/like-button", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: liked ? "unlike" : "like",
        }),
      });

      if (response.status >= 200 && response.status < 300) {
        setLiked(!liked);
      } else {
        const res = await response.json();
        setError(res.message);
        return;
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="App">
      <button
        disabled={isFetching}
        className={`likeBtn ${liked ? "liked" : ""}`}
        onClick={handleLikeUnlike}
      >
        {isFetching ? <SpinnerIcon /> : <HeartIcon />}
        {liked ? "Liked" : "Like"}
      </button>
      {/* error handling */}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
