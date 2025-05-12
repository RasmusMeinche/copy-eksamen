import { getData } from "@/lib/smk";

const Eventliste = async ({ info }) => {
  const dataVaerker = await getData();
  console.log(dataVaerker.items);
  return (
    <section>
      {dataVaerker.items.map((art) => (
        <article key={art.id}>
          <h1>{art.object_number}</h1>
        </article>
      ))}
    </section>
  );
};

export default Eventliste;