import Link from "next/link";

const CricketGame = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <h2>Welcome to specific cricket game</h2>
      <h3>Id of this game is : {id}</h3>

      <div>
        <Link href={`/summary/${id}`}>
          <button>View Match Summarys</button>
        </Link>
      </div>
    </div>
  );
};

export default CricketGame;
