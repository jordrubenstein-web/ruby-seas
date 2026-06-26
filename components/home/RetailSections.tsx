import { RetailPageOne } from "@/components/home/RetailPageOne";
import { RetailPageTwo } from "@/components/home/RetailPageTwo";
import { RetailSectionBackdrop } from "@/components/home/RetailSectionBackdrop";

export function RetailSections() {
  return (
    <>
      <div className="relative overflow-hidden">
        <RetailSectionBackdrop />
        <RetailPageOne />
      </div>
      <RetailPageTwo />
    </>
  );
}
