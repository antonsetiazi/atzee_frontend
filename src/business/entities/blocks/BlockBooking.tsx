/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { BookingBlockSchema } from "./types";
import { httpGet, httpPost } from "@/core/http/http.client";
import { inputBase } from "@/business/forms/fields/field.ui";
import { useSessionStore } from "@/core/session/session.store";

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
        <div className="max-w-3xl mx-auto bg-white py-6 space-y-6">
            <h2 className="text-2xl font-semibold">{block.title}</h2>

            {/* Partner */}
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <div className="text-lg font-medium">
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
                                className={`relative cursor-pointer border border-gray-200 rounded-lg p-4 transition ${
                                    isSelected
                                        ? "border-blue-500 bg-blue-50"
                                        : "hover:border-gray-400"
                                }`}
                            >
                                {/* Checkmark */}

                                <div className="flex gap-3">
                                    {isSelected ? (
                                        <div className="bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full">
                                            ✓
                                        </div>
                                    ) : (
                                        <div className="bg-white border-2 border-gray-200 w-6 h-6 flex items-center justify-center rounded-full"></div>
                                    )}

                                    <div className="flex flex-1 justify-between">
                                        <div>
                                            <div className="font-medium">
                                                {service.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {service.duration_minutes} menit
                                            </div>
                                        </div>
                                        <div className="font-semibold">
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
                                className={`p-2 border rounded ${
                                    !slot.available
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : selectedSlot?.start === slot.start
                                          ? "bg-blue-600 text-white"
                                          : "hover:bg-blue-50 border-gray-200"
                                }`}
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
                    className="w-full bg-gray-800 text-white py-2 rounded disabled:opacity-50"
                >
                    Hitung Estimasi
                </button>
            )}

            {estimate && (
                <div className="bg-gray-50 p-4 border border-gray-200 rounded space-y-1">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>
                            Rp{" "}
                            {Number(estimate.subtotal).toLocaleString("id-ID")}
                        </span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>
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
            <button
                onClick={handleSubmit}
                disabled={!selectedSlot}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
            >
                Buat Booking
            </button>
        </div>
    );
}
