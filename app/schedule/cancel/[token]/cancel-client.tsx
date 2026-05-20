"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export function CancelClient({ token }: { token: string }) {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function cancel() {
    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/schedule/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not cancel.");
        setState("error");
        return;
      }
      setState("ok");
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Appointment canceled.</span>
        </div>
        <p className="text-sm text-muted-foreground">
          We've removed the booking from our calendar and emailed a confirmation.
        </p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-destructive">
          <XCircle className="h-5 w-5" />
          <span className="font-medium">{error}</span>
        </div>
        <Button onClick={cancel} variant="outline">
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Click below to confirm canceling this appointment.
      </p>
      <Button onClick={cancel} disabled={state === "loading"} variant="destructive">
        {state === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Canceling…
          </>
        ) : (
          "Cancel appointment"
        )}
      </Button>
    </div>
  );
}
