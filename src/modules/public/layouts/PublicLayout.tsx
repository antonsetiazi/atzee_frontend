// src/modules/public/layouts/PublicLayout.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function PublicLayout({ children }: any) {
    return (
        <div>
            <header>Logo / Navbar</header>

            <main style={{ maxWidth: 800, margin: "0 auto" }}>{children}</main>

            <footer>© 2026 Ustadzku</footer>
        </div>
    );
}
