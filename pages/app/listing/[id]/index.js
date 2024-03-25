import Layout from "@/components/app/Layout";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";


// TODOS: 
// Show all guides  



const ListingPage = ({ listingData }) => {
  return (
    <Layout>
      <div className="p-5 space-y-8">
        <h1 className="text-3xl font-extrabold">Listing page</h1>{" "}
        <p>{listingData.name}</p>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const supabase = createPagesServerClient(ctx);

  const { data } = await supabase.from("listings").select("name").eq("id", id);

  return {
    props: {
      listingData: data[0],
    },
  };
};

export default ListingPage;
