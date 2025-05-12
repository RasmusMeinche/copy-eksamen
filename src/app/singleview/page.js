"use client";

import { getData } from "@/lib/smk";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const Singleview = async ({ info }) => {
  const dataVaerker = await getData();
  console.log(dataVaerker.items);

  const filteredItems = dataVaerker.items.filter(art => art.has_image);

  return (
    <section>
      {filteredItems.map(art => (
        <div key={art.id} style={{ backgroundColor: art.suggested_bg_color }}>
           <Header bgColor={art.suggested_bg_color} />
          <div className="flex pt-10 pb-10" style={{ backgroundColor: art.suggested_bg_color }}>
            <img className="w-[900px] px-8" src={art.image_thumbnail} />
            <div className="flex flex-col p-5">
              <h1 className="font-bold text-3xl text-white">{art.titles?.[0]?.title}</h1>
              <h2 className="pt-5 font-thin text-2xl text-white">{art.techniques} - <br/> {art.artist}</h2>
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </section>
  );
};

export default Singleview;
