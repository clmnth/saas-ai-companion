import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import { CompanionForm } from "./components/companion-form";


interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionPage = async ({ 
  params
 }: CompanionIdPageProps) => {
  const { userId } = auth();
  // TODO: check subscription

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div>
      <CompanionForm 
        initialData={companion} 
        categories={categories} 
      />
    </div>
  );
};

export default CompanionPage;
