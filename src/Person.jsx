import apiConfig from "./apiconfig";

const Person = (props) => {
//   console.log(props);
  const { id, name, original_name, media_type, profile_path, known_for } =
    props;

  const imgUrl = `${apiConfig.imgBaseUrl}w185${profile_path}`;
//   console.log(`imageUrl: ${imgUrl}`);
  return (
    <div className="flick-card">
      <h1>{name ? name : original_name}</h1>
      <p>
        Media: {media_type} | ID: {id}
      </p>
      <img src={imgUrl} alt="" className="person-photo" />
      {/* {console.log(known_for)} */}
      <ul className="peli-ref">
        {known_for.map((peli) => (
            <li key={peli.id}>{peli.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default Person;
