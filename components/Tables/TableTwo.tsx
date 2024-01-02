import Image from "next/image";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { Product } from "@/types/product";
import Link from "next/link";

const firebaseConfig = {
  apiKey: "AIzaSyAeIztP5qgjKlUYEWur2xuFpGhdVhqbbHs",
  authDomain: "marcio-artesanatos.firebaseapp.com",
  projectId: "marcio-artesanatos",
  storageBucket: "marcio-artesanatos.appspot.com",
  messagingSenderId: "949736169495",
  appId: "1:949736169495:web:12d470b7fc84e52222fc52",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const TableTwo = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const collectionRef = collection(firestore, "produtos");

      try {
        const snapshot = await getDocs(collectionRef);
        const productsData: Product[] = snapshot.docs.map(
          (doc) => doc.data() as Product
        );
        setProducts(productsData);
      } catch (error) {
        console.error("Error reading data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <Link href="/addProducts" className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-3 px-2">
          Adicionar Produto
        </Link>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Produto</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Descrição Curta</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Quantidade</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Preço</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Ações</p>
        </div>
      </div>

      {products.map((product, index) => {
        if (Array.isArray(product.imagens) && product.imagens.length > 0) {
          const primeiroLink = product.imagens[0];

          if (typeof primeiroLink === "string" && primeiroLink.trim() !== "") {
            console.log("Valid Product:", product);

            return (
              <div
                key={index}
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-3 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-12.5 w-15 rounded-md">
                      <Image
                        src={primeiroLink}
                        width={60}
                        height={50}
                        alt="Produto"
                      />
                    </div>
                    <p className="text-sm text-black dark:text-white">
                      {product.produto}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">
                    {product.shortdescription}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {product.quantidade}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    R$ {product.valor}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-meta-3">Editar Produto</p>
                </div>
              </div>
            );
          } else {
            console.warn("Invalid primeiroLink:", primeiroLink);
          }
        }
      })}
    </div>
  );
};

export default TableTwo;
