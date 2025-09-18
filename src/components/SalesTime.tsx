import { CountdownTimer, SectionTitle, Tag } from "../components";

export function SalesTime() {
  return (
    <div className="flex flex-col gap-4">
      <Tag>Today’s</Tag>
      <div className="flex flex-wrap items-center gap-6 lg:gap-20">
        <SectionTitle className="shrink-0">Flash Sales</SectionTitle>
        <CountdownTimer targetDate="2025-11-10T22:59:59" variant="flashSale" />
      </div>
    </div>
  );
}
