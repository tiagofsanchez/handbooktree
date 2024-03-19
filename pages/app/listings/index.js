import { DialogListing } from "@/components/app/DioalogListing";
import Layout from "@/components/app/Layout";
import { CirclePlus } from "lucide-react";

// TODO:
// button to add more listings
// Modal to add the listings

const listingsPage = () => {
  return (
    <Layout>
      <DialogListing/>
      <div className="p-5 space-y-8">
        <h1 className="text-3xl">user listings page</h1>
        
      </div>
      
    </Layout>
  );
};

export default listingsPage;
