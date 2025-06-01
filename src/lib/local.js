export async function getLocalData() {
  const data = await fetch("https://eventdatabase.onrender.com/events");
  const res = await data.json();
  return res;
}
