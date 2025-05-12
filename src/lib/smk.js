export async function getData() {
  const data = await fetch(
    "https://api.smk.dk/api/v1/art/?object_number=KMS402"
  );
  const res = await data.json();
  return res;
}
