import { notFound } from "next/navigation";
import { isSchedulingConfigured } from "@/lib/scheduling-config";
import { Header } from "@/components/header";
import { ScheduleClient } from "./schedule-client";
import { services } from "@/lib/services";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book an Appointment | Tech Services Nano",
  description:
    "Pick a time that works for you. Tech Services Nano provides ethical, flat-rate computer repair and IT support.",
};

export default function SchedulePage() {
  if (!isSchedulingConfigured()) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Book an Appointment
              </h1>
              <p className="text-muted-foreground mt-2">
                Pick a service, choose a time, and we'll confirm by email.
              </p>
            </div>
            <ScheduleClient services={services} />
          </div>
        </section>
      </main>
    </div>
  );
}
