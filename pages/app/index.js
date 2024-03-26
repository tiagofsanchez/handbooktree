import Layout from "@/components/app/layout";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

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
