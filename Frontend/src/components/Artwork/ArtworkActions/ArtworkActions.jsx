import Button from "../../UI/Button/Button";

import "./ArtworkActions.css";

const ArtworkActions = ({
  voteCount,
  hasVoted,
  loading,
  onVote,
}) => {

  return (

    <div className="artwork-actions">

      <div className="vote-card">

        <div className="vote-count">

          <h2>
            ❤️ {voteCount}
          </h2>

          <p>Total Votes</p>

        </div>

        <div className="vote-content">

          <h3>
            Support this Artwork
          </h3>

          <p>
            Every vote helps this artwork climb the leaderboard.
          </p>
          <Button
            onClick={onVote}
            disabled={hasVoted || loading}
          >
            {
              loading
                ?
                "Voting..."
                :
                hasVoted
                  ?
                  "✓ You Voted"
                  :
                  "❤️ Vote For This Artwork"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkActions;