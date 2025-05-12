import FetchData from "../fetch/FetchData";

const Eventliste = ({ info }) => {
    return (
        <section>
            {info.items.map((vaerk) => (
                <article>
                    <h1>{vaerk.title}</h1>
                </article>
            ))}
       </section>
    );
};

export default Eventliste;