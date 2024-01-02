"use client";
import React, { useState } from "react";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../types/firebaseConfig";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

function ItemCadastro() {
  const [categoria, setCategoria] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState("");
  const [cores, setCores] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [peso, setPeso] = useState("");
  const [descricao, setDescricao] = useState("");
  const [shortdescription, setShortDescription] = useState("");
  const [imagens, setImagens] = useState<React.SetStateAction<File[]>>([]);

  const handleCategoriaChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCategoria(e.target.value);
  };
  const handleProdutoChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProduto(e.target.value);
  };
  const handleValorChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValor(e.target.value);
  };
  const handleCoresChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCores(e.target.value);
  };
  const handleQuantidadeChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuantidade(e.target.value);
  };
  const handlePesoChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPeso(e.target.value);
  };
  const handleLarguraChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLargura(e.target.value);
  };
  const handleAlturaChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAltura(e.target.value);
  };
  const handleComprimentoChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setComprimento(e.target.value);
  };
  const handleShortDescriptionChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setShortDescription(e.target.value);
  };
  const handleDescricaoChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDescricao(e.target.value);
  };

  const handleImagensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/")
    );
    setImagens(selectedImages as File[]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "produtos"), {
        categoria: categoria,
        produto: produto,
        valor: valor,
        cores: cores,
        quantidade: quantidade,
        largura: largura,
        altura: altura,
        comprimento: comprimento,
        peso: peso,
        shortdescription: shortdescription,
        descricao: descricao,
      });

      const currentImagens =
        imagens instanceof Function ? imagens([]) : imagens;

      const imagensUrls = await Promise.all(
        currentImagens.map(async (imagem, index) => {
          const storageRef = ref(
            storage,
            `produtos/${docRef.id}/imagem_${index}`
          );
          await uploadBytes(storageRef, imagem);
          const imageUrl = await getDownloadURL(storageRef);
          return imageUrl;
        })
      );

      await setDoc(docRef, { imagens: imagensUrls }, { merge: true });

      setCategoria("");
      setProduto("");
      setValor("");
      setCores("");
      setQuantidade("");
      setLargura("");
      setAltura("");
      setComprimento("");
      setPeso("");
      setShortDescription("");
      setDescricao("");
      setImagens([]);

      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Adicionar Produto" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-row gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Categoria
                    </label>

                    <input
                      type="text"
                      placeholder="Selecione a categoria"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={categoria}
                      onChange={handleCategoriaChange}
                      required
                    />
                  </div>

                  {/* Produto */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Produto
                    </label>
                    <input
                      type="text"
                      placeholder="Insira o nome do Produto"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={produto}
                      onChange={handleProdutoChange}
                    />
                  </div>
                </div>

                <div className="p-6.5">
                  {/* Valor */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Valor
                    </label>
                    <input
                      type="text"
                      placeholder="Insira o Valor do Produto"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={valor}
                      onChange={handleValorChange}
                    />
                  </div>

                  {/* Cores */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Cores
                    </label>
                    <input
                      type="text"
                      placeholder="Escolha a cor do produto"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={cores}
                      onChange={handleCoresChange}
                    />
                  </div>

                  {/* Quantidade */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Quantidade
                    </label>
                    <input
                      type="text"
                      placeholder="Qual a quantidade no estoque?"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={quantidade}
                      onChange={handleQuantidadeChange}
                    />
                  </div>

                  {/* Peso */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Peso
                    </label>
                    <input
                      type="text"
                      placeholder="Qual o peso do produto?"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={peso}
                      onChange={handlePesoChange}
                    />
                  </div>

                  {/* Largura */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Largura
                    </label>
                    <input
                      type="text"
                      placeholder="Qual o peso do produto?"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={largura}
                      onChange={handleLarguraChange}
                    />
                  </div>

                  {/* Altura */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Altura
                    </label>
                    <input
                      type="text"
                      placeholder="Qual a altura do produto?"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={altura}
                      onChange={handleAlturaChange}
                    />
                  </div>

                  {/* Comprimento */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Comprimento
                    </label>
                    <input
                      type="text"
                      placeholder="Qual o comprimento do produto?"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={comprimento}
                      onChange={handleComprimentoChange}
                    />
                  </div>

                  {/* Descrição Curta */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Descrição Curta
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Insira a descrição curta do produto"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={shortdescription}
                      onChange={handleShortDescriptionChange}
                    ></textarea>
                  </div>

                  {/* Descrição Completa */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Descrição Completa
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Insira a descrição completa do produto"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={descricao}
                      onChange={handleDescricaoChange}
                    ></textarea>
                  </div>

                  <label className="form-label">Imagens:</label>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    onChange={handleImagensChange}
                  />
                  <div className="form-text">
                    Envie as imagens do seu produto
                  </div>

                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                    Cadastrar Produto
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemCadastro;
