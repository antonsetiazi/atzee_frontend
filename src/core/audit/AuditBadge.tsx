import React from "react";

interface Props {
    count: number;
}

const AuditBadge: React.FC<Props> = ({ count }) => {
    return (
        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
            {count} log
        </span>
    );
};

export default AuditBadge;
