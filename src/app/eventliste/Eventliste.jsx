import { getData } from "@/lib/smk";

const Eventliste = async ({ info }) => {
  const myData = await getData();
  console.log(myData.items);
  return (
    <section>
      {myData.items.map((vaerk) => (
        <article key={vaerk.id}>
          <h1>{vaerk.object_number}</h1>
        </article>
      ))}
    </section>
  );
};

export default Eventliste;
