import { getData } from "@/lib/smk";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

//////////////////////////////////////////////////////////////////////////////

// Brug nedenstående kode til at vise flere værker

// const Singleview = async ({ info }) => {
//   const dataVaerker = await getData();
//   console.log(dataVaerker.items);

//   const filteredItems = dataVaerker.items.filter(art => art.has_image);

//////////////////////////////////////////////////////////////////////////////

//brug denne kode til at vise et enkelt værk

  const dataVaerk_enkelt = 1;

  const Singleview = async () => {
    const dataVaerker = await getData();
    console.log(dataVaerker.items);
  
    const filteredItems = dataVaerker.items
      .filter(art => art.has_image)
      .slice(0, dataVaerk_enkelt);

//////////////////////////////////////////////////////////////////////////////

  return (
    <section>
      {filteredItems.map(art => (
        <div key={art.id} style={{ backgroundColor: art.suggested_bg_color }}>
           <Header bgColor={art.suggested_bg_color} />
          <div className="flex pt-10 px-12 pb-10 gap-10" style={{ backgroundColor: art.suggested_bg_color }}>
            <img className="w-[750px] shadow-xl/50" src={art.image_thumbnail} />
            <div className="flex flex-col p-5">
              <h1 className="font-bold text-3xl text-white">{art.titles?.[0]?.title}</h1>
              <h2 className="pt-5 font-thin text-2xl text-white">{art.techniques} - <br/> {art.artist}</h2>
            </div>
          </div>
          <div className="flex flex-col px-50 pb-50 pt-20 text-white">
            <div className="flex flex-row p-5">
              <div className="w-1/2">
                <h1 className="text-4xl">| Kunstner</h1>
              </div>
              <div className="w-1/2 flex flex-row gap-20">
                <div>
                <p className="font-bold text-2xl pb-3">Navn</p>
                  <p>{art.artist || "N/A"}</p>
                </div>
                <div>
                  <p className="font-bold text-2xl pb-3">Nationalitet</p>
                  <p>{art.production?.[0]?.creator_nationality || "N/A"}</p>
                </div>
                <div>
                  <p className="font-bold text-2xl pb-3">Levetid</p>
                  <p>{art.production?.[0]?.creator_date_of_birth?.slice(0,4) || "N/A"} - {art.production?.[0]?.creator_date_of_death?.slice(0,4) || "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row p-5">
              <div className="w-1/2">
                <h1 className="text-4xl">| Om værket</h1>
              </div>
              <div className="w-1/2">
              <p className="leading-loose">{art.labels?.[0]?.text || "N/A"}</p>
              </div>
            </div>
            <div className="flex flex-row p-5">
              <div className="w-1/2">
                <h1 className="text-4xl">| Teknik og Farver</h1>
              </div>
              <div className="w-1/2">
                <p><strong>Teknik:</strong> {art.techniques || "N/A"}</p>
                <div className="flex flex-wrap pt-5 gap-2.5 max-w-[17.5rem]">
                  {art.colors?.filter(Boolean).map((hex) => (
                <div
                  key={hex}
                  className="w-12 h-12 rounded-full flex-shrink-0 shadow-xl/30"
                  style={{ backgroundColor: hex }}/>
                  ))}     
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </section>
  );
};

export default Singleview;
