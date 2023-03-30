import Movie from "./Movie";
import Person from "./Person";

const Results = ({ movies, persons }) => {
  if (!movies.length && !persons.length) {
    return (
      <section className="results">
        <h3>Not Media Found</h3>
      </section>
    );
  } else if (persons.length) {
    return (
      <section className="results">
        {persons.map((person) => {
          return <Person key={person.id} {...person} />
        })}
      </section>
    );
  } else {
    return (
      <section className="results">
        {movies.map((flick) => {
          return <Movie key={flick.id} {...flick} />;
        })}
      </section>
    );
  }
};
export default Results;
