import Layout from "@/components/app/Layout";
import { CirclePlus } from "lucide-react";

// TODO:
// button to add more listings
// Modal to add the listings

const listingsPage = () => {
  return (
    <Layout>
      <div className="p-5">
        <h1>user listings page</h1>
        <div className="absolute bottom-4 right-4">
          <button className=" bg-stone-200/30 rounded-full p-2 hover:bg-gradient-to-br hover:to-pink-300 hover:from-rose-900">

            <CirclePlus size={32} />{" "}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default listingsPage;
