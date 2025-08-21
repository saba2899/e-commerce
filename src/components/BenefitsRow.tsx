import { FiTruck, FiHeadphones, FiCheckCircle } from "react-icons/fi";

type FeatureItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

function FeatureItem({ icon, title, subtitle }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="grid w-16 h-16 rounded-full place-items-center bg-gray-300/70">
        <div className="grid w-12 h-12 text-white bg-black rounded-full place-items-center">
          {icon}
        </div>
      </div>
      <h4 className="text-sm font-semibold tracking-wide text-black uppercase md:text-base">
        {title}
      </h4>
      <p className="text-xs md:text-sm text-gray-600 max-w-[220px]">
        {subtitle}
      </p>
    </div>
  );
}

export function BenefitsRow() {
  return (
    <section className="mt-24 page-container">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 place-items-center">
        <FeatureItem
          icon={<FiTruck size={18} />}
          title="Free and fast delivery"
          subtitle="Free delivery for all orders over $140"
        />
        <FeatureItem
          icon={<FiHeadphones size={18} />}
          title="24/7 customer service"
          subtitle="Friendly 24/7 customer support"
        />
        <FeatureItem
          icon={<FiCheckCircle size={18} />}
          title="Money back guarantee"
          subtitle="We return money within 30 days"
        />
      </div>
    </section>
  );
}
