import { fetchGame } from "@/app/server-actions/fetchGame";
import { connect } from "@/db/connect";
import Match from "@/models/match.model";

const Summary = async ({ params }) => {
  const { id } = params;
  connect();
  const match = await fetchGame(id);

  console.log(match);

  if (!match) {
    return <div>Match not found</div>;
  }
  return (
    <div>
      <p>Match id is {match._id}</p>
    </div>
  );
};

export default Summary;
