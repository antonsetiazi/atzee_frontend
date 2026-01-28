import React from "react";
import { useAudit } from "./useAudit";

interface Props {
    entity: string;
    recordId: string;
    onClose: () => void;
}

const AuditLogDrawer: React.FC<Props> = ({ entity, recordId, onClose }) => {
    const { getLogsByEntity } = useAudit();
    const logs = getLogsByEntity(entity, recordId);

    return (
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-xl p-4 overflow-auto">
            <button onClick={onClose}>Close</button>
            <h3 className="text-lg font-bold mb-4">Audit Log</h3>
            {logs.length === 0 && <p>No logs found</p>}
            <ul>
                {logs.map((log) => (
                    <li key={log.id} className="mb-2 border-b pb-1">
                        <div>
                            <strong>{log.action}</strong> by {log.userName} at{" "}
                            {new Date(log.timestamp).toLocaleString()}
                        </div>
                        {log.changes && (
                            <pre className="text-xs bg-gray-100 p-2 rounded">
                                {JSON.stringify(log.changes, null, 2)}
                            </pre>
                        )}
                        {log.note && <div className="text-sm">{log.note}</div>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuditLogDrawer;
