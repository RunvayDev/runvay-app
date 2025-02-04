import ProfilePage from "@/components/ProfilePage";

interface PageProps {
  params: {
    name: string;
  };
}

export default function Profile({ params }: PageProps) {
  const { name } = params;
  return (
    <div>
      <ProfilePage name={name} />
    </div>
  );
}
