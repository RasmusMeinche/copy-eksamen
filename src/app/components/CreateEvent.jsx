"use client";

export default function CreateEvent() {

     function handleTitleChange(e) {
    setEventInfo((prev) => ({ ...prev, title: e.target.value }));
  }
  function handleCuratorChange(e) {
    setEventInfo((prev) => ({ ...prev, curator: e.target.value }));
  }
  function handleDateChange(e) {
    setEventInfo((prev) => ({ ...prev, date: e.target.value }));
  }
  function handleDescriptionChange(e) {
    setEventInfo((prev) => ({ ...prev, description: e.target.value }));
  }

  return (
    <form className="flex flex-col shadow-md p-4 h-full" action="">
      <div className="flex items-center justify-between shadow-md text-xl my-2 h-full">
        <label className="font-bold pl-4 bg-white" htmlFor="titel">Titel:</label>
        <input
          className="bg-gray-300 ml-4 p-4 h-full text-white w-1/2"
          type="text"
          id="titel"
          value=""
          onChange={handleTitleChange}
        />
      </div>

      <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4 bg-white" htmlFor="kurator">Kurator:</label>
        <input
          className="bg-gray-300 ml-4 p-4 h-full text-white w-1/2"
          type="text"
          id="kurator"
          value=""
          onChange={handleCuratorChange}
        />
      </div>

      <div className="flex items-center justify-between shadow-md text-xl my-2">
        <label className="font-bold pl-4 bg-white" htmlFor="dato">Dato:</label>
        <input
          className="bg-gray-300 ml-4 p-4 h-full text-white w-1/2"
          type="text"
          id="dato"
          value=""
          onChange={handleDateChange}
        />
      </div>

      <div className="my-4 shadow-md text-xl flex flex-col h-[200px]">
        <label className="font-bold mb-2 mx-4 py-2" htmlFor="beskrivelse">Beskrivelse:</label>
        <textarea
          className="text-white bg-gray-300 px-4 py-2 h-full resize-none"
          id="beskrivelse"
          value=""
          onChange={handleDescriptionChange}
        />
      </div>
        <div className="flex justify-center p-4 gap-20">
  <button className="text-3xl grid place-items-start items-end w-1/4 h-[60px] px-2 py-1.5 border border-[#800000] text-[#800000]  hover:bg-[#800000] hover:text-white cursor-pointer">Opret Event</button>
</div>
    </form>
  );
}