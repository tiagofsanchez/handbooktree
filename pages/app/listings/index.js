import { CreateListingDialog } from "@/components/app/create-listing-dialog";
import Layout from "@/components/app/Layout";

// TODO:
// button to add more listings
// Modal to add the listings

const listingsPage = () => {
  return (
    <Layout>
      <CreateListingDialog />
      <div className="p-5 space-y-8">
        <h1 className="text-3xl">user listings page</h1>
      </div>
    </Layout>
  );
};

export default listingsPage;
