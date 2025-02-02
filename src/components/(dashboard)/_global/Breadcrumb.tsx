import { Button } from "@/components/ui/button";
interface BreadcrumbProps {
  pageName: string;
  onClick?: () => void;
}
const Breadcrumb = ({ pageName, onClick }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="titleSection font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <Button onClick={onClick}>Tambah {pageName}</Button>
    </div>
  );
};

export default Breadcrumb;
