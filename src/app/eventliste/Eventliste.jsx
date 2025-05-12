import { getLocalData } from "@/lib/local";

const page = async () => {
  const localData = await getLocalData();
  console.log(localData);



  return (
    <section>

          <h1>{localData.events}</h1>
    </section>
  );
};

export default page;
