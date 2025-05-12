export async function getLocalData() {
    const data = await fetch(
      "http://localhost:8080/events"
    );
    const res = await data.json();
    return res;
  }
  