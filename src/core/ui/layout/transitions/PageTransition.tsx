// src/core/ui/layout/transitions/PageTransition.tsx

import { useLocation } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

export default function PageTransition({ children }: Props) {
    const location = useLocation();

    return (
        <div key={location.pathname} className="page-transition">
            {children}
        </div>
    );
}
