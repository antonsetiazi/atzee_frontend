// src/modules/wallet/pages/WalletTopupPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { HeaderPage, Button } from "@/core/ui/components";
import { useSnapPayment } from "@/core/payment/useSnapPayment";

import { walletService } from "../services/wallet.service";
import { notificationService } from "@/modules/notification/services/notification.service";

import { eventBus } from "@/core/event/event.bus";

const CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

const QUICK_AMOUNTS = [50000, 100000, 200000, 500000, 1000000];

export default function WalletTopupPage() {
    const navigate = useNavigate();

    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const { pay } = useSnapPayment({
        clientKey: CLIENT_KEY,
    });

    function handleSelectAmount(value: number) {
        setAmount(value);
    }

    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value.replace(/\D/g, ""));
        setAmount(value);
    }

    async function handleTopup() {
        try {
            if (!amount || amount < 10000) {
                notificationService.toast.error("Minimal topup Rp 10.000");
                return;
            }

            setLoading(true);

            const res = await walletService.topup(amount);

            if (!res) throw new Error("No response");

            if (res.type === "popup" && res.payload.token) {
                pay(res.payload.token, {
                    onSuccess: () => {
                        eventBus.emit("wallet.topup.success", {
                            amount,
                        });
                        navigate("/wallet");
                    },
                    onPending: () => {
                        eventBus.emit("wallet.topup.pending", {
                            amount,
                        });
                        navigate("/wallet");
                    },
                    onError: () => {
                        eventBus.emit("wallet.topup.failed", {
                            message: "Topup gagal",
                        });
                    },
                });
                return;
            }

            if (res.type === "redirect" && res.payload.url) {
                window.location.href = res.payload.url;
                return;
            }

            throw new Error("Invalid topup execution");
        } catch (err) {
            console.error(err);
            notificationService.toast.error("Gagal memproses topup");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <HeaderPage title="Topup Wallet" />

            <div className="p-4 space-y-6">
                {/* =========================
                   💎 HERO AMOUNT INPUT
                ========================= */}
                <div className="rounded-3xl p-6 bg-[var(--bg-secondary)] border border-[var(--color-border))] shadow-sm">
                    <div className="text-sm text-[var(--text-secondary)] mb-2">
                        Nominal Topup
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-lg text-[var(--text-secondary)]">
                            Rp
                        </span>

                        <input
                            type="text"
                            value={amount ? amount.toLocaleString("id-ID") : ""}
                            onChange={handleChangeInput}
                            placeholder="0"
                            className="w-full bg-transparent text-3xl font-semibold focus:outline-none"
                        />
                    </div>
                </div>

                {/* =========================
                   ⚡ QUICK SELECT
                ========================= */}
                <div>
                    <div className="text-sm text-[var(--text-secondary)] mb-2">
                        Pilih Cepat
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {QUICK_AMOUNTS.map((val) => {
                            const active = amount === val;

                            return (
                                <button
                                    key={val}
                                    onClick={() => handleSelectAmount(val)}
                                    className={`
                                        relative px-3 py-3 rounded-2xl text-sm transition-all
                                        border
                                        ${
                                            active
                                                ? "bg-[var(--color-primary)] text-white border-transparent shadow-lg scale-[1.03]"
                                                : "bg-white border-[var(--color-border))] hover:border-[var(--color-primary)]"
                                        }
                                    `}
                                >
                                    Rp {val.toLocaleString("id-ID")}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* =========================
                   🧾 SUMMARY
                ========================= */}
                {amount > 0 && (
                    <div className="rounded-2xl p-4 bg-[var(--bg-secondary)]">
                        <div className="flex justify-center text-sm text-[var(--text-secondary)]">
                            Kamu akan topup sebesar
                        </div>

                        <div className="flex justify-center text-xl font-semibold mt-1">
                            Rp {amount.toLocaleString("id-ID")}
                        </div>
                    </div>
                )}

                {/* =========================
                   🚀 CTA BUTTON
                ========================= */}
                <Button
                    onClick={handleTopup}
                    disabled={loading}
                    variant="primary"
                    fullWidth
                    size="lg"
                    // className="w-full h-12 text-base rounded-2xl"
                >
                    {loading ? "Memproses..." : "Lanjut ke Pembayaran"}
                </Button>
            </div>
        </>
    );
}
