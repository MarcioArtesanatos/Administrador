"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import TableTwo from "@/components/Tables/TableTwo";

const Products = () => {
  return (
    <>
      <Breadcrumb pageName="Produtos" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <TableTwo />
      </div>
    </>
  );
};

export default Products;
