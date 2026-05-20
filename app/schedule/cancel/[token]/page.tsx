import { notFound } from "next/navigation";
import { isSchedulingConfigured } from "@/lib/scheduling-config";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CancelClient } from "./cancel-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cancel Appointment | Tech Services Nano",
  robots: { index: false, follow: false },
};

export default async function CancelPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  if (!isSchedulingConfigured()) {
    notFound();
  }
  const { token } = await params;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6 max-w-xl">
            <Card>
              <CardHeader>
                <CardTitle>Cancel your appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <CancelClient token={token} />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
