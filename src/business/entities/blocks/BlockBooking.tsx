/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockBooking.tsx

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { BookingBlockSchema } from "./types";
import { httpGet, httpPost } from "@/core/http/http.client";
import { inputBase } from "@/business/forms/fields/field.ui";
import { useSessionStore } from "@/core/session/session.store";
import { Button } from "@/core/ui/components";

interface Props {
    block: BookingBlockSchema;
}

export default function BlockBooking({ block }: Props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const user = useSessionStore((s) => s.user);

    const [context, setContext] = useState<any>(null);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [slots, setSlots] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [notes, setNotes] = useState<string>("");
    const [estimate, setEstimate] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const partnerId = searchParams.get("partner_id");

    // =========================
    // LOAD CONTEXT
    // =========================
    useEffect(() => {
        if (!block.data_source) return;

        const loadContext = async () => {
            setLoading(true);
            try {
                const data = await httpGet<any>(
                    `${block.data_source}?partner_id=${partnerId}`,
                );
                setContext(data);
            } finally {
                setLoading(false);
            }
        };

        loadContext();
    }, [block.data_source, partnerId]);

    // =========================
    // LOAD AVAILABILITY
    // =========================
    useEffect(() => {
        const loadAvailability = async () => {
            if (!selectedDate || !selectedServices.length) return;

            const serviceParam = selectedServices.join(",");

            const data = await httpGet<any>(
                `/business/bookings/availability/?partner_id=${partnerId}&date=${selectedDate}&service_ids=${serviceParam}`,
            );

            setSlots(data.slots || []);
            setSelectedSlot(null);
        };

        loadAvailability();
    }, [selectedDate, selectedServices, partnerId]);

    // =========================
    // ESTIMATE
    // =========================
    const handleEstimate = async () => {
        if (!block.estimate_endpoint || !selectedSlot) return;

        const payload = {
            partner_id: partnerId,
            services: selectedServices,
            schedule: selectedSlot.start,
            notes,
        };

        const data = await httpPost<any>(block.estimate_endpoint, payload);
        setEstimate(data);
    };

    // =========================
    // SUBMIT
    // =========================
    const handleSubmit = async () => {
        if (!block.submit_to || !selectedSlot) return;

        const items = selectedServices.map((id) => {
            const service = context.services.find((s: any) => s.id === id);
            return {
                product_id: service.id,
                quantity: 1, // default 1
                unit_price: service.price, // ini opsional kalau backend perlu
                subtotal: service.price, // opsional, bisa dihitung backend
            };
        });

        const payload = {
            user_id: user?.id,
            partner_id: partnerId,
            start_time: selectedSlot.start,
            end_time: selectedSlot.end,
            items,
            notes,
        };

        const data = await httpPost<any>(block.submit_to, payload);

        if (block.redirect_to && data?.[block.redirect_to.param]) {
            navigate(`/business/bookings/${data.id}/detail`);
        }
    };

    // =========================
    // RENDER
    // =========================
    if (loading) return <div>Loading booking...</div>;
    if (!context) return null;

    return (
        <div
            className="max-w-3xl mx-auto p-8 space-y-8"
            style={{
                background: "var(--color-background)",
            }}
        >
            <h2
                className="text-2xl font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
            >
                {block.title}
            </h2>

            {/* Partner */}
            <div
                className="rounded-xl p-5"
                style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                }}
            >
                <div
                    className="text-lg font-medium"
                    style={{ color: "var(--text-primary)" }}
                >
                    {context.partner?.name}
                </div>
            </div>

            {/* Services */}
            <div className="space-y-3">
                <h4 className="text-sm font-medium">Pilih Layanan</h4>
                <div className="grid gap-3">
                    {context.services?.map((service: any) => {
                        const isSelected = selectedServices.includes(
                            service.id,
                        );

                        return (
                            <div
                                key={service.id}
                                onClick={() => {
                                    if (block.allow_multiple_services) {
                                        setSelectedServices((prev) =>
                                            isSelected
                                                ? prev.filter(
                                                      (id) => id !== service.id,
                                                  )
                                                : [...prev, service.id],
                                        );
                                    } else {
                                        setSelectedServices([service.id]);
                                    }
                                }}
                                className="relative cursor-pointer rounded-xl p-4 transition-all duration-200"
                                style={{
                                    background: isSelected
                                        ? "var(--color-surface-alt)"
                                        : "var(--color-surface)",
                                    border: isSelected
                                        ? "1px solid var(--color-primary)"
                                        : "1px solid var(--color-border)",
                                }}
                            >
                                {/* Checkmark */}

                                <div className="flex gap-3">
                                    {isSelected ? (
                                        <div
                                            className="w-6 h-6 flex items-center justify-center rounded-full text-sm"
                                            style={{
                                                background:
                                                    "var(--color-primary)",
                                                color: "white",
                                            }}
                                        >
                                            ✓
                                        </div>
                                    ) : (
                                        <div
                                            className="w-6 h-6 rounded-full"
                                            style={{
                                                border: "2px solid var(--color-border)",
                                            }}
                                        />
                                    )}

                                    <div className="flex flex-1 justify-between">
                                        <div>
                                            <div
                                                style={{
                                                    color: "var(--text-primary)",
                                                }}
                                            >
                                                {service.name}
                                            </div>
                                            <div
                                                className="text-sm"
                                                style={{
                                                    color: "var(--text-secondary)",
                                                }}
                                            >
                                                {service.duration_minutes} menit
                                            </div>
                                        </div>
                                        <div
                                            className="font-semibold"
                                            style={{
                                                color: "var(--text-primary)",
                                            }}
                                        >
                                            Rp{" "}
                                            {Number(
                                                service.price,
                                            ).toLocaleString("id-ID")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Date Picker */}
            {block.require_schedule && (
                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Pilih Tanggal</h4>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className={inputBase}
                    />
                </div>
            )}

            {/* Slot List */}
            {slots.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Pilih Jam</h4>
                    <div className="grid grid-cols-3 gap-2 ">
                        {slots.map((slot, index) => (
                            <button
                                key={index}
                                disabled={!slot.available}
                                onClick={() => setSelectedSlot(slot)}
                                className="p-2 rounded-md text-sm font-medium transition"
                                style={{
                                    background: !slot.available
                                        ? "var(--color-surface-alt)"
                                        : selectedSlot?.start === slot.start
                                          ? "var(--color-primary)"
                                          : "var(--color-surface)",
                                    color:
                                        selectedSlot?.start === slot.start
                                            ? "white"
                                            : "var(--text-primary)",
                                    border: "1px solid var(--color-border)",
                                    opacity: !slot.available ? 0.5 : 1,
                                    cursor: !slot.available
                                        ? "not-allowed"
                                        : "pointer",
                                }}
                            >
                                {new Date(slot.start).toLocaleTimeString(
                                    "id-ID",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    },
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Estimate */}
            {block.estimate_endpoint && (
                <button
                    onClick={handleEstimate}
                    disabled={!selectedSlot}
                    className="w-full py-2 rounded-lg font-medium transition disabled:opacity-50"
                    style={{
                        background: "var(--color-surface-alt)",
                        color: "var(--text-primary)",
                        border: "1px solid var(--color-border)",
                    }}
                >
                    Hitung Estimasi
                </button>
            )}

            {estimate && (
                <div
                    className="p-5 rounded-xl space-y-2"
                    style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                    }}
                >
                    <div className="flex justify-between">
                        <span style={{ color: "var(--text-secondary)" }}>
                            Subtotal
                        </span>
                        <span style={{ color: "var(--text-secondary)" }}>
                            Rp{" "}
                            {Number(estimate.subtotal).toLocaleString("id-ID")}
                        </span>
                    </div>
                    <div
                        className="flex justify-between font-semibold text-lg"
                        style={{ color: "var(--text-primary)" }}
                    >
                        <span style={{ color: "var(--text-secondary)" }}>
                            Total
                        </span>
                        <span style={{ color: "var(--text-secondary)" }}>
                            Rp {Number(estimate.total).toLocaleString("id-ID")}
                        </span>
                    </div>
                </div>
            )}

            {/* Notes */}
            <div>
                <h4 className="text-sm font-medium">Catatan</h4>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={inputBase}
                />
            </div>

            {/* Submit */}
            <Button
                type="button"
                loading={loading}
                fullWidth
                onClick={handleSubmit}
                disabled={!selectedSlot}
                size="lg"
            >
                {loading ? "Submit..." : "Buat Booking"}
            </Button>
        </div>
    );
}
