import { getData } from "@/lib/smk";

const Eventliste = async ({ info }) => {
  const dataVaerker = await getData();
  console.log(dataVaerker.items);
  return (
    <section>
      {dataVaerker.items.map((vaerk) => (
        <article key={vaerk.id}>
          <h1>{vaerk.object_number}</h1>
        </article>
      ))}
    </section>
  );
};

export default Eventliste;
