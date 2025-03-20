import SingleUserScreen from "@/screens/single-user/single-user-screen";

function SingleUserPage({ params }: { params: { id: string } }) {
  return <SingleUserScreen id={params.id} />;
}

export default SingleUserPage;
