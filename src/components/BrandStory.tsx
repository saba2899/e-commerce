import girls from "../assets/girls.jpg";

export function BrandStory() {
  return (
    <div className="page-container flex items-center gap-20 justify-center m-auto mt-30">
      <div className="flex flex-col gap-3 w-118">
        <h1 className="text-4xl font-semibold">Our Story</h1>
        <p>
          Launced in 2015, Exclusive is South Asia’s premier online shopping
          makterplace with an active presense in Bangladesh. Supported by wide
          range of tailored marketing, data and service solutions, Exclusive has
          10,500 sallers and 300 brands and serves 3 millioons customers across
          the region.
        </p>
        <p>
          Exclusive has more than 1 Million products to offer, growing at a very
          fast. Exclusive offers a diverse assotment in categories ranging from
          consumer.
        </p>
      </div>
      <div>
        <img src={girls} alt="girls" />
      </div>
    </div>
  );
}
