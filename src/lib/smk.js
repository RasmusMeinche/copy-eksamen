export async function getData() {
  const data = await fetch(
    "https://api.smk.dk/api/v1/art/search/?keys=*&offset=2&rows=1"
  );
  const res = await data.json();
  return res;
}
