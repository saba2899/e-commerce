// src/components/SalesTime.tsx
import CountdownTimer from "./CountdownTimer";
import SectionTitle from "./SectionTitle";
import Tag from "./Tag";

export default function SalesTime() {
  return (
    <div className="flex flex-col gap-4">
      <Tag>Today’s</Tag>
      <div className="flex flex-wrap gap-6 lg:gap-20 items-center">
        <SectionTitle className="shrink-0">Flash Sales</SectionTitle>
        <CountdownTimer targetDate="2025-09-10T22:59:59" variant="flashSale" />
      </div>
    </div>
  );
}
