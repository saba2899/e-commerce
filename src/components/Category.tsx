import { CategoriesDiv } from "./CategoriesDiv";
import { SectionTitle } from "./SectionTitle";
import { Tag } from "./Tag";

export function Category() {
  return (
    <div className="flex flex-col gap-4 mt-24 page-container">
      <Tag>Categories</Tag>
      <SectionTitle>Browse By Category</SectionTitle>
      <CategoriesDiv />
    </div>
  );
}
