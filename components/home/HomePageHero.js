import Image from "next/image";
import { Button } from "../ui/button";
import handbooktree from "../../public/images/handbooktree.svg";

const HomePageHero = () => {
  return (
    <section className=" py-20 lg:py-40 px-5 border rounded-xl bg-stone-50 ">
      <div className="">
      <div className=" container mx-auto flex lg:gap-8 flex-col lg:flex-row items-center justify-between px-5">
        {/* Left column (2/3 width on large screens) */}
        <div className="lg:w-2/3 ">
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Welcome to{" "}
            <span className="text-pink-600 font-extrabold">HandbookTree</span>
          </h1>
          <p className="text-lg mb-8">
            Ever hosted guests for short-term stays? You know the drill —
            explaining house rules, giving local tips — it can be a bit of a
            hassle, right? Well, that's where HandbookTree swoops in.
          </p>

          <Button>Get Started</Button>
        </div>
        {/* Right column (1/3 width on large screens) */}
        <div className="lg:w-1/3">
          <Image width={300} height={300} src={handbooktree} alt="Hero Image" />
        </div>
      </div>
      </div>
    </section>
  );
};

export default HomePageHero;
