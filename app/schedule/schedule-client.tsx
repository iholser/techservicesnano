"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CheckCircle, Loader2 } from "lucide-react";
import type { Service } from "@/lib/services";

type Slot = { start: string; end: string; label: string };
type BookingResult = { bookingId: string; cancelUrl: string; whenLabel: string };

function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatLabelTime(label: string): string {
  const [hStr, mStr] = label.split(":");
  const h = parseInt(hStr, 10);
  const m = mStr;
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${period}`;
}

export function ScheduleClient({ services }: { services: Service[] }) {
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    hp: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);

  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceId),
    [services, serviceId],
  );

  useEffect(() => {
    setSelectedSlot(null);
    if (!date || !serviceId) {
      setSlots(null);
      return;
    }
    const controller = new AbortController();
    setSlotsLoading(true);
    setSlotsError(null);
    fetch(
      `/api/schedule/slots?date=${isoDate(date)}&service=${encodeURIComponent(serviceId)}`,
      { signal: controller.signal },
    )
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed (${res.status})`);
        return res.json();
      })
      .then((data) => setSlots(data.slots ?? []))
      .catch((err) => {
        if ((err as Error).name === "AbortError") return;
        setSlotsError("Could not load times. Please try again.");
      })
      .finally(() => setSlotsLoading(false));
    return () => controller.abort();
  }, [date, serviceId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/schedule/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: serviceId,
          start: selectedSlot.start,
          ...form,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Could not book this appointment.");
        if (res.status === 409) {
          setSlots(
            (prev) => prev?.filter((s) => s.start !== selectedSlot.start) ?? prev,
          );
          setSelectedSlot(null);
        }
        return;
      }
      setResult(data as BookingResult);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            You're booked
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            <strong>{selectedService?.title}</strong>
          </p>
          <p>{result.whenLabel}</p>
          <p className="text-sm text-muted-foreground">
            A confirmation email is on the way. Need to cancel? Use the link in
            that email or this one:
          </p>
          <p className="text-sm break-all">
            <a className="underline" href={result.cancelUrl}>
              {result.cancelUrl}
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>1. Choose a service</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={serviceId} onValueChange={setServiceId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.title} — ${s.price} · {s.durationMinutes} min
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Pick a date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(d) => d < today || d > maxDate}
            className="rounded-md border w-fit"
          />
        </CardContent>
      </Card>

      {date && (
        <Card>
          <CardHeader>
            <CardTitle>3. Choose a time</CardTitle>
          </CardHeader>
          <CardContent>
            {slotsLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading available
                times…
              </div>
            )}
            {slotsError && (
              <p className="text-sm text-destructive">{slotsError}</p>
            )}
            {!slotsLoading && !slotsError && slots && slots.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No times available on this date. Try another day.
              </p>
            )}
            {!slotsLoading && slots && slots.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {slots.map((s) => (
                  <Button
                    key={s.start}
                    type="button"
                    variant={
                      selectedSlot?.start === s.start ? "default" : "outline"
                    }
                    onClick={() => setSelectedSlot(s)}
                  >
                    {formatLabelTime(s.label)}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {selectedSlot && (
        <Card>
          <CardHeader>
            <CardTitle>4. Your details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <input
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                value={form.hp}
                onChange={(e) => setForm({ ...form, hp: e.target.value })}
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address (optional)</Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">What's going on? (optional)</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                  placeholder="Briefly describe the issue or what you'd like done."
                />
              </div>
              {submitError && (
                <p className="text-sm text-destructive">{submitError}</p>
              )}
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking…
                  </>
                ) : (
                  `Book ${formatLabelTime(selectedSlot.label)}`
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
