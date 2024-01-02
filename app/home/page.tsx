import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";

const MessageHome = () => {
  return (
    <>
      <Breadcrumb pageName="Home" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative p-10 z-20 h-85 md:h-85">
          <p>Seja bem vindo à Área Administrativa.</p>
          <p>Navegue pelo menu lateral para encontrar o que deseja.</p>
          <p>Para dúvidas, sugestões ou para reportar um erro, entre em contato pelo e-mail: rixxercorp@gmail.com.</p>
        </div>
      </div>
    </>
  );
};

export default MessageHome;
