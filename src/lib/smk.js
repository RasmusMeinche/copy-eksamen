export async function getData() {
  const data = await fetch(
<<<<<<< HEAD
    "https://api.smk.dk/api/v1/art/search/?keys=*&offset=12000&rows=100"
=======
    "https://api.smk.dk/api/v1/art/?object_number=KMS402"
>>>>>>> Olivers-Branch
  );
  const res = await data.json();
  return res;
}
