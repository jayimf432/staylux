"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Lock, Unlock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

function isoDate(d: Date) {
  return d.toISOString().split("T")[0];
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function CalendarPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [listingTitle, setListingTitle] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [blockedRes, listingRes, bookingsRes] = await Promise.all([
        fetch(`/api/host/listings/${id}/blocked-dates`),
        fetch(`/api/listings/${id}`),
        fetch(`/api/host/bookings`),
      ]);

      if (blockedRes.ok) {
        const dates: string[] = await blockedRes.json();
        setBlockedDates(new Set(dates));
      }
      if (listingRes.ok) {
        const listing = await listingRes.json();
        setListingTitle(listing.title ?? "");
        // Build booked date ranges from confirmed bookings
        const bookings = listing.bookings ?? [];
        const booked = new Set<string>();
        for (const b of bookings) {
          if (!["CONFIRMED", "PENDING"].includes(b.status)) continue;
          const start = new Date(b.checkIn);
          const end = new Date(b.checkOut);
          for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
            booked.add(isoDate(new Date(d)));
          }
        }
        setBookedDates(booked);
      }
      if (bookingsRes.ok) {
        const allBookings = await bookingsRes.json();
        const relevant = allBookings.filter((b: any) => b.listingId === id && ["CONFIRMED", "PENDING"].includes(b.status));
        const booked = new Set<string>();
        for (const b of relevant) {
          const start = new Date(b.checkIn);
          const end = new Date(b.checkOut);
          for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
            booked.add(isoDate(new Date(d)));
          }
        }
        setBookedDates(booked);
      }
    } catch {
      toast.error("Failed to load calendar data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadData(); }, [loadData]);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
    setSelected(new Set());
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
    setSelected(new Set());
  };

  const toggleDay = (dateStr: string) => {
    if (bookedDates.has(dateStr)) return; // Can't touch booked dates
    const past = new Date(dateStr) < new Date(isoDate(today));
    if (past) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(dateStr)) next.delete(dateStr);
      else next.add(dateStr);
      return next;
    });
  };

  const blockSelected = async () => {
    if (selected.size === 0) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/host/listings/${id}/blocked-dates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dates: [...selected] }),
      });
      if (!res.ok) throw new Error();
      setBlockedDates((prev) => new Set([...prev, ...selected]));
      setSelected(new Set());
      toast.success(`${selected.size} date${selected.size !== 1 ? "s" : ""} blocked`);
    } catch {
      toast.error("Failed to block dates");
    } finally {
      setSaving(false);
    }
  };

  const unblockSelected = async () => {
    if (selected.size === 0) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/host/listings/${id}/blocked-dates`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dates: [...selected] }),
      });
      if (!res.ok) throw new Error();
      setBlockedDates((prev) => {
        const next = new Set(prev);
        selected.forEach((d) => next.delete(d));
        return next;
      });
      setSelected(new Set());
      toast.success(`${selected.size} date${selected.size !== 1 ? "s" : ""} unblocked`);
    } catch {
      toast.error("Failed to unblock dates");
    } finally {
      setSaving(false);
    }
  };

  const days = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);
  const selectedHasBlocked = [...selected].some((d) => blockedDates.has(d));
  const selectedHasAvailable = [...selected].some((d) => !blockedDates.has(d));

  return (
    <div className="max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/host/listings")} className="p-2 rounded-full hover:bg-accent transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Availability calendar</h1>
            {listingTitle && <p className="text-xs text-muted-foreground line-clamp-1">{listingTitle}</p>}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700" />Available</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-700" />Blocked by you</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-100 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-700" />Booked by guest</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary/20 border border-primary" />Selected</span>
        </div>

        {/* Calendar */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-base font-semibold">{MONTHS[month]} {year}</CardTitle>
              <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {/* Weekday headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {WEEKDAYS.map((d) => (
                    <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for offset */}
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}

                  {Array.from({ length: days }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const isPast = new Date(dateStr) < new Date(isoDate(today));
                    const isBlocked = blockedDates.has(dateStr);
                    const isBooked = bookedDates.has(dateStr);
                    const isSelected = selected.has(dateStr);
                    const isToday = dateStr === isoDate(today);

                    let cellClass = "relative h-10 w-full rounded-lg text-sm font-medium flex items-center justify-center transition-all ";

                    if (isPast) {
                      cellClass += "text-muted-foreground/40 cursor-not-allowed";
                    } else if (isBooked) {
                      cellClass += "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 cursor-not-allowed";
                    } else if (isSelected) {
                      cellClass += "bg-primary text-white ring-2 ring-primary ring-offset-1 cursor-pointer";
                    } else if (isBlocked) {
                      cellClass += "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-950/60 cursor-pointer";
                    } else {
                      cellClass += "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 cursor-pointer";
                    }

                    return (
                      <button
                        key={dateStr}
                        className={cellClass}
                        onClick={() => toggleDay(dateStr)}
                        disabled={isPast || isBooked}
                      >
                        {day}
                        {isToday && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Action bar */}
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border shadow-sm"
          >
            <p className="text-sm font-medium">{selected.size} date{selected.size !== 1 ? "s" : ""} selected</p>
            <div className="flex gap-2">
              {selectedHasBlocked && (
                <Button variant="outline" size="sm" className="gap-1.5" onClick={unblockSelected} disabled={saving}>
                  <Unlock className="h-3.5 w-3.5" /> Unblock
                </Button>
              )}
              {selectedHasAvailable && (
                <Button variant="gradient" size="sm" className="gap-1.5" onClick={blockSelected} disabled={saving}>
                  <Lock className="h-3.5 w-3.5" /> Block
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* Info */}
        <div className="flex gap-2 p-3 rounded-xl bg-muted/50 text-xs text-muted-foreground">
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          <p>Click dates to select them, then block or unblock. Booked dates cannot be modified. Blocked dates won't appear available to guests.</p>
        </div>

      </motion.div>
    </div>
  );
}
