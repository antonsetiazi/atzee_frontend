/* eslint-disable @typescript-eslint/no-explicit-any */
// src/shared/utils/formatValue.ts

interface FormatConfig {
    format?: string;
    currency?: string;
    locale?: string;
    suffix?: string;
    prefix?: string;
    timezone?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}

export function formatValue(value: any, config?: FormatConfig): string {
    if (value === null || value === undefined || value === "") {
        return "-";
    }

    const {
        format,
        currency,
        locale = navigator.language || "id-ID",
        suffix,
        prefix,
        timezone,
        minimumFractionDigits,
        maximumFractionDigits,
    } = config || {};

    let formatted: string = String(value);

    try {
        switch (format) {
            case "currency": {
                const num = Number(value);
                if (isNaN(num)) return String(value);

                formatted = new Intl.NumberFormat(locale, {
                    style: "currency",
                    currency: currency || "IDR",
                    minimumFractionDigits: minimumFractionDigits ?? 0,
                    maximumFractionDigits: maximumFractionDigits ?? 0,
                }).format(num);
                break;
            }

            case "number": {
                const num = Number(value);
                if (isNaN(num)) return String(value);

                formatted = new Intl.NumberFormat(locale, {
                    minimumFractionDigits: minimumFractionDigits ?? 0,
                    maximumFractionDigits: maximumFractionDigits ?? 2,
                }).format(num);
                break;
            }

            case "datetime": {
                const date = new Date(value);
                if (isNaN(date.getTime())) return String(value);

                formatted = new Intl.DateTimeFormat(locale, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: timezone, // optional override
                }).format(date);
                break;
            }

            case "date": {
                const date = new Date(value);
                if (isNaN(date.getTime())) return String(value);

                formatted = new Intl.DateTimeFormat(locale, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    timeZone: timezone,
                }).format(date);
                break;
            }

            case "time": {
                const date = new Date(value);
                if (isNaN(date.getTime())) return String(value);

                formatted = new Intl.DateTimeFormat(locale, {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: timezone,
                }).format(date);
                break;
            }

            case "uppercase":
                formatted = String(value).toUpperCase();
                break;

            case "lowercase":
                formatted = String(value).toLowerCase();
                break;

            default:
                formatted = String(value);
        }
    } catch {
        formatted = String(value);
    }

    if (prefix) formatted = prefix + formatted;
    if (suffix) formatted = formatted + suffix;

    return formatted;
}
