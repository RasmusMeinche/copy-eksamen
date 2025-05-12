import { getData } from "@/lib/smk";

const Singleview = async ({ info }) => {
  const dataVaerker = await getData();
  console.log(dataVaerker.items);

  const filteredItems = dataVaerker.items.filter(art => art.has_image);

  return (
    <section>
      <ul className="grid grid-cols-3 gap-4">
        {filteredItems.map(art => (
          <li className="border-2 border-black w-[400px] p-5 m-5" key={art.id}>
            <strong>{art.titles?.[0]?.title}</strong><br />
            Artist: {art.artist}<br />
            Period: {art.production_date?.period || "N/A"}<br />
            Technique: {art.techniques}<br />
            <img src={art.image_thumbnail} className="mt-2 w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Singleview;
