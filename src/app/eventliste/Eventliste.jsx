import FetchData from "../fetch/Fetchdata";

const Eventliste = ({ info }) => {
    return (
        <section>
            {info.map((vaerker) => (
            <h1>{info.items.title}</h1>
            ))}
       </section>
    );
};

export default Eventliste;