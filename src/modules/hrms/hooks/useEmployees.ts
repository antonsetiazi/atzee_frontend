// src/modules/hrms/hooks/useEmployees.ts

import { useCallback, useEffect, useState } from "react";

import {
    createEmployee,
    deleteEmployee,
    getEmployees,
    updateEmployee,
} from "../services/employee.service";

import type {
    CreateEmployeePayload,
    Employee,
    UpdateEmployeePayload,
} from "../types/employee.types";

export function useEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getEmployees();

            setEmployees(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch employees");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCreateEmployee = async (payload: CreateEmployeePayload) => {
        await createEmployee(payload);

        await fetchEmployees();
    };

    const handleUpdateEmployee = async (id: string, payload: UpdateEmployeePayload) => {
        await updateEmployee(id, payload);

        await fetchEmployees();
    };

    const handleDeleteEmployee = async (id: string) => {
        await deleteEmployee(id);

        await fetchEmployees();
    };

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    return {
        employees,

        loading,
        error,

        fetchEmployees,

        createEmployee: handleCreateEmployee,

        updateEmployee: handleUpdateEmployee,

        deleteEmployee: handleDeleteEmployee,
    };
}
