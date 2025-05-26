import ConfirmedSektion from "../components/ConfirmedSektion";
import Header from "../components/Header";

export default function Home() {
  return (
    <section className="bg-[#800000]">
      <Header title="EVENTS" />
      <div className="py-10">
        <div className="flex flex-row px-6 py-4">
          <h1 className="text-white text-4xl font-[600]">
            TAK FOR DIN BESTILLING
          </h1>
        </div>
        <div className="flex flex-row">
          <div className="basis-[60%] border-t-6 border-b-6 border-r-6 border-white p-8 flex flex-col gap-4 justify-between">
            <ConfirmedSektion />
          </div>
          <div className="basis-[40%]"></div>
        </div>
      </div>
    </section>
  );
}
