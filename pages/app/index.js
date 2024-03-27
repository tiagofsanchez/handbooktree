import Layout from "@/components/app/Layout";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";


// TODO: 
// A nice explanation about the app for when you log in
// Talk about the listings and how you can actually add listings to it

const App = ({ userData }) => {
  return (
    <Layout >
      <div className="p-5">
        <h1>Something</h1>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: user } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.user.id);

  return {
    props: {
      userData: data[0] || "",
    },
  };
};

export default App;
