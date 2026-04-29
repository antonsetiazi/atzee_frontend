// src/core/navigation/SmartNavigate.ts

import type { NavigateFunction } from "react-router-dom";

class SmartNavigateClass {
    private navigate: NavigateFunction | null = null;
    private locked = false;

    register(navigate: NavigateFunction) {
        this.navigate = navigate;
    }

    // ===================================
    // INTERNAL LOCK (anti double click)
    // ===================================
    private run(callback: () => void) {
        if (this.locked) return;

        this.locked = true;
        callback();

        setTimeout(() => {
            this.locked = false;
        }, 300);
    }

    // ===================================
    // BASIC
    // ===================================
    go(path: string) {
        if (!this.navigate) return;

        this.run(() => {
            this.navigate!(path);
        });
    }

    replace(path: string) {
        if (!this.navigate) return;

        this.run(() => {
            this.navigate!(path, { replace: true });
        });
    }

    hardReplace(path: string) {
        this.run(() => {
            window.location.replace(path);
        });
    }

    back() {
        window.history.back();
    }

    safeBack(fallback = "/") {
        if (window.history.length > 1) {
            this.back();
        } else {
            this.replace(fallback);
        }
    }

    // ===================================
    // APP ACTIONS
    // ===================================

    loginSuccess() {
        this.hardReplace("/dashboard");
    }

    logout() {
        this.hardReplace("/login");
    }

    sessionExpired() {
        this.hardReplace("/session-expired");
    }

    toDashboard() {
        this.replace("/dashboard");
    }

    toOrders() {
        this.go("/orders");
    }

    toCart() {
        this.go("/cart");
    }

    toWallet() {
        this.go("/wallet");
    }

    paymentSuccess(orderId: string | number) {
        this.hardReplace(`/orders/${orderId}`);
    }

    tracking(orderId: string | number) {
        this.go(`/tracking/${orderId}`);
    }

    partnerOrder(orderId: string | number) {
        this.go(`/partner/orders/${orderId}`);
    }
}

export const SmartNavigate = new SmartNavigateClass();
