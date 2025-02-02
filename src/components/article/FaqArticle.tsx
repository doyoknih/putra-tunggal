import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { dataFaqArticle } from "@/lib/data";

const FaqArticle = () => {
  return (
    <div className="Container">
      <div className="md:ContainerX">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-y-2"
        >
          {dataFaqArticle.map((item, index) => (
            <AccordionItem key={index} value={item.answer}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FaqArticle;
