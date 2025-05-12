export async function getData() {
  const data = await fetch(
    "https://api.smk.dk/api/v1/art/search/?keys=*&offset=12000&rows=500"
  );
  const res = await data.json();
  return res;
}
