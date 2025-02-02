import Logo from "@/assets/Logo.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { dataFaq } from "@/lib/data";
import Image from "next/image";

const Faq = () => {
  return (
    <div className="Container">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
        <p className="titleSection text-center">
          Tanya Biro Psikologi Putra Tunggal(FAQs)
        </p>
        <div className="bg-primary flex items-center gap-1 py-2 px-4 rounded-lg">
          <div className="min-w-5">
            <Image src={Logo} alt="logo" width={0} height={0} sizes="100vw" />
          </div>
          <p className="titleContent text-white font-medium">Putra Tunggal</p>
        </div>
      </div>
      <div className="my-10 lg:my-16 md:ContainerX">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-y-2"
        >
          {dataFaq.map((item, index) => (
            <AccordionItem key={index} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export { Faq };
