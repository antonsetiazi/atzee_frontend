// src/modules/account/profile/components/ProfileActions.tsx

import { useNavigate } from "react-router-dom";
import { useAuthService } from "@/app/auth/auth.service";

export default function ProfileActions() {
    const navigate = useNavigate();
    const { logout } = useAuthService();

    const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            logout();
            navigate("/login");
        }
    };

    return (
        <div
            className="
                rounded-2xl
                p-5
                space-y-3
                border
                shadow-sm
            "
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
                boxShadow: "var(--shadow)",
            }}
        >
            {/* CHANGE PASSWORD */}
            <button
                onClick={() => navigate("/account/password")}
                className="
                    w-full
                    rounded-xl
                    py-3
                    text-sm
                    transition
                "
                style={{
                    border: "1px solid var(--color-border)",
                    color: "var(--text-primary)",
                    background: "var(--color-surface-alt)",
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--color-surface)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                        "var(--color-surface-alt)")
                }
            >
                Change Password
            </button>

            {/* ADDRESS */}
            <button
                onClick={() => navigate("/account/address")}
                className="
                    w-full
                    rounded-xl
                    py-3
                    text-sm
                    transition
                "
                style={{
                    border: "1px solid var(--color-border)",
                    color: "var(--text-primary)",
                    background: "var(--color-surface-alt)",
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--color-surface)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                        "var(--color-surface-alt)")
                }
            >
                Manage Address
            </button>

            {/* BANK */}
            <button
                onClick={() => navigate("/account/bank")}
                className="
                    w-full
                    rounded-xl
                    py-3
                    text-sm
                    transition
                "
                style={{
                    border: "1px solid var(--color-border)",
                    color: "var(--text-primary)",
                    background: "var(--color-surface-alt)",
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--color-surface)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                        "var(--color-surface-alt)")
                }
            >
                Manage Bank Account
            </button>

            {/* LOGOUT */}
            <button
                onClick={handleLogout}
                className="
                    w-full
                    rounded-xl
                    py-3
                    text-sm
                    font-semibold
                    transition
                    active:scale-[0.98]
                "
                style={{
                    border: "1px solid var(--color-error)",
                    color: "var(--color-error)",
                    background: "transparent",
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,0,0,0.05)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                }
            >
                Logout
            </button>
        </div>
    );
}
