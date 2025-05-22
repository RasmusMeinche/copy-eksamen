export async function getData() {
  const data = await fetch(
    "https://api.smk.dk/api/v1/art/search/?keys=*&offset=12425&rows=100"
  );
  const res = await data.json();
  return res;
}


export async function getArtworkById(objectNumber) {
  const res = await fetch(`https://api.smk.dk/api/v1/art?object_number=${objectNumber}`);
  const data = await res.json();
  return data?.items?.[0];
}