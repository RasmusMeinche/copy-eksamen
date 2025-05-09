import Eventliste from "../eventliste/Eventliste";

const fetchData = async () => {
    const data = await fetch("https://api.smk.dk/api/v1/art/search/?keys=*&offset=0&rows=20");
    const info = await data.json();
    console.log(info);
    return Eventliste({ info });
};

export default FetchData;