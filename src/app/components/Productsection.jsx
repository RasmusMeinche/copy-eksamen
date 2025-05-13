import { getData } from "@/lib/local";

const Productsection = async () => {
  const eventData = await getData();
  return <section></section>;
};

export default Productsection;
