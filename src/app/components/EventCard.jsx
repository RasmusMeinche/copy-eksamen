import { getLocalData } from "@/lib/local";
import Image from "next/image";
import layout from "@/app/layout";
import Button from "./Button";
import Kuratoredit from "./Kuratoredit";
import { ClerkProvider, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import PopoverWrapper from "./PopOver";


export const EventCard = async () => {
  const localData = await getLocalData();
  console.log(localData);

  return (
    < ClerkProvider>
      < SignedIn>
    <section className="grid grid-cols-[minmax(20px,0.2fr)_1fr_minmax(20px,0.2fr)] justify-center items-center py-8 bg-[#800000] font-roboto-condensed">
      {localData.map((event) => {
        const imageId = event.artworkIds[0];
        const imageUrl = `https://iip-thumb.smk.dk/iiif/jp2/1z40kx99j_${imageId}.tif.jp2/full/!1024,/0/default.jpg`;
        console.log("Det her er url'en:", imageUrl);

        return (
          <div
            key={event.id}
            className="col-start-2 grid grid-cols-[auto,1fr] inset-shadow-sm border mb-10 mt-10 border-white text-white w-full overflow-visible"
          >
            <div className="flex gap-4 border border-white items-center p-4">
              <div className="h-full ">
                <Image
                  src={imageUrl}
                  alt="Event Image"
                  width={300}
                  height={300}
                  className="bg-amber-50 h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between w-full leading-none">
                <div className="flex flex-row justify-between items-end">
                <h1 className="font-medium text-3xl">{event.title}</h1>
                  {/* <SignedIn> */}
                    <PopoverWrapper curator={event.curator} />
                 {/*  </SignedIn> */}
                </div>
                <p className="mb-4 font-thin text-xl">{event.curator}</p>
                <p className="text-m font-medium max-w-[550px] w-[50%] mb-4 leading-6">{event.description}</p>
                  <div className="flex flex-row justify-between items-end">
                    <p className="font-extralight text-2xl">{event.date}</p>
                      <Button title="Læs Mere"/>
                  </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
    </SignedIn>
  </ClerkProvider>
  );
};