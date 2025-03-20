import SingleUserScreen from "@/screens/single-user/single-user-screen";

type Params = Promise<{ id: string }>;

async function SingleUserPage({ params }: { params: Params }) {
  const { id } = await params;
  return <SingleUserScreen id={id} />;
}

export default SingleUserPage;
