import { notFound } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { isResourceName, RESOURCES } from "@/shared/resources";

export const generateStaticParams = () => Object.keys(RESOURCES).map((resource) => ({ resource }));

export default async function AdminResourcePage({ params }: PageProps<"/admin/[resource]">) {
  const { resource } = await params;
  if (!isResourceName(resource)) notFound();

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 p-5 md:p-10">
        {!process.env.SUPABASE_URL && (
          <p className="mb-6 rounded-[10px] border-3 border-ink bg-sun px-4 py-3 font-bold">
            Supabase isn&apos;t connected, so the public site is showing placeholder seed content and edits can&apos;t be saved. Add your keys to .env.local.
          </p>
        )}
        <ResourceManager name={resource} />
      </main>
    </div>
  );
}
