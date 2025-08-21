import { CategoriesDiv, SectionTitle, Tag } from "../components";

export function Category() {
  return (
    <div className="flex flex-col gap-4 mt-24 page-container max-sm:hidden">
      <Tag>Categories</Tag>
      <SectionTitle>Browse By Category</SectionTitle>
      <CategoriesDiv />
    </div>
  );
}
