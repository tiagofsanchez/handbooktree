import DOMPurify from "isomorphic-dompurify";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GuidesList = ({ guidesArray }) => {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-3xl"
      >
        <CarouselContent>
          {guidesArray.map((guide) => {
            const sanitizedHTML = DOMPurify?.sanitize(guide.description);

            // // Create a temporary div element to parse the sanitized HTML
            // const tempDiv = document.createElement("div");
            // tempDiv.innerHTML = sanitizedHTML;

            // // Extract the first two paragraphs
            // const paragraphs = tempDiv.querySelectorAll("p");
            // let firstTwoParagraphs = "";
            // if (paragraphs.length > 0)
            //   firstTwoParagraphs += paragraphs[0].outerHTML;
            // if (paragraphs.length > 1)
            //   firstTwoParagraphs += paragraphs[1].outerHTML;

            return (
              <CarouselItem
                key={guide.id}
                className="md:basis-1/3 lg:basis-1/3"
              >
                <div className="p-0.5">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <div
                        className="card"
                        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                      />
                    </CardContent>
                    <CardFooter>
                      <span className=" inline-flex truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700">
                        See more ↗
                      </span>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default GuidesList;
