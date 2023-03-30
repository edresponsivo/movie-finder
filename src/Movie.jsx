import apiConfig from "./apiconfig";

const Movie = (props) => {
  //   console.log(props.id);
  const {
    original_title,
    original_name,
    media_type,
    id,
    backdrop_path,
    poster_path,
    overview,
  } = props;

  const imgUrl = `${apiConfig.imgBaseUrl}w342${poster_path}`;
  // console.log(`imageUrl: ${imgUrl}`);
  return (
    <div className="flick-card">
      <h1>{original_title ? original_title : original_name}</h1>
      <p>
        Media: {media_type} | ID: {id}
      </p>
      <p className="description">{overview}</p>
      <img src={imgUrl} alt="" className="photo" />
    </div>
  );
};
export default Movie;
