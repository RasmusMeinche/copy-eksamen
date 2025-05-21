import { getLocalData } from "@/lib/local";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";


export default async function eventssingleview({ params }) {
  const { id } = params;
  const allEvents = await getLocalData();
  const event = allEvents.find((e) => e.id === id);

  console.log("params.id:", id);
  console.log("allEvents:", allEvents);

  if (!event) notFound();

  return (
    <div className="bg-blue-300">
        <Header/>
        <div className="h-screen text-white">
            <div className="px-[10%] py-[10%] mt-[5%] border-b-6 border-t-6 border-r-6 w-[60%]">
                <h1 className="text-5xl font-medium">{event.title}</h1>
                <h2 className="text-4xl font-thin pb-15">Periode</h2>
                <Link href="/checkout">
                <button 
                    type="submit" 
                    className="relative border border-white px-4 py-5 w-40 h-14 hover:bg-white hover:text-[#800000]">
                    <span className="absolute bottom-2 left-2 text-left">Book Billetter</span>
                </button>
                </Link>
            </div>
        </div>
        <div className="flex flex-col px-50 pb-50 pt-20 text-black">
            <div className="flex flex-row p-5">
              <div className="w-1/2">
                <h1 className="text-4xl">| Om eventet</h1>
              </div>
              {/* <div className="w-1/2"></div> */}
            </div>
            <div className="flex flex-row p-5">
              <div className="w-1/2">
                <h1 className="text-4xl">| Lokation</h1>
              </div>
              {/* <div className="w-1/2"></div> */}
            </div>
            <div className="flex flex-row p-5">
              <div className="w-1/2">
                <h1 className="text-4xl">| Tid og Dato</h1>
              </div>
              {/* <div className="w-1/2"></div> */}
            </div>
            <div className="flex flex-row p-5">
              <div className="w-1/2">
                <h1 className="text-4xl">| Værker</h1>
              </div>
              {/* <div className="w-1/2"></div> */}
            </div>
        </div>
        <Footer />
    </div>
);
};