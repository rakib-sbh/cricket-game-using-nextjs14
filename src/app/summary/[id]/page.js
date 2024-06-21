import Match from "@/models/match.model";

const Summary = async ({ params }) => {
  const { id } = params;
  const match = await Match.findById(id).populate("teams");
  const countries = match.teams.map((team) => team.country);
  return (
    <div>
      <h1>Welcome to specific match summary page</h1>
      <h3>Id of the mathc is : {id}</h3>
      <h3>Countries playing this games are : </h3>
      <ul>
        {countries.map((country, i) => (
          <li key={i}>{country}</li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
