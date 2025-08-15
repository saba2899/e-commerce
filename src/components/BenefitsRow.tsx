import { FiTruck, FiHeadphones, FiCheckCircle } from "react-icons/fi";

type FeatureItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

function FeatureItem({ icon, title, subtitle }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="grid place-items-center rounded-full bg-gray-300/70 w-16 h-16">
        <div className="grid place-items-center rounded-full bg-black text-white w-12 h-12">
          {icon}
        </div>
      </div>
      <h4 className="font-semibold text-black uppercase tracking-wide text-sm md:text-base">
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
    <section className="page-container mt-24">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 place-items-center">
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


