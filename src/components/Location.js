import Card from "../UI/Card";

const Location = ({ id, name, country, onShowDetails }) => {
  const showDetails = () => {
    onShowDetails(id);
  };
  return (
    <div onClick={showDetails}>
      <Card>
        <p>
          {name}, {country}
        </p>
      </Card>
    </div>
  );
};

export default Location;
