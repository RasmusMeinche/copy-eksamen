import Eventliste from "../eventliste/Eventliste";

const FetchData = async () => {
    const response = await fetch("https://api.smk.dk/api/v1/art/search/?keys=*&offset=0&rows=100");
    const data = await response.json();
    console.log("Virker det", data);
    return <Eventliste info={ data } />;
};

export default FetchData;