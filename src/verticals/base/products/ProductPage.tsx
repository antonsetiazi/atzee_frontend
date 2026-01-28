import WorkflowActions from "../../../business/workflows/WorkflowActions";
import { useWorkflowAction } from "../../../business/workflows/useWorkflowAction";
import type { WorkflowState } from "../../../business/workflows/types";
import ProductListPage from "./ProductListPage";

export default function ProductPage() {
    const { execute } = useWorkflowAction();

    const workflowState: WorkflowState = {
        state: "draft",
        actions: [
            {
                key: "approve",
                label: "Approve",
                permission: "products.approve",
                variant: "primary",
            },
            {
                key: "reject",
                label: "Reject",
                permission: "products.reject",
                variant: "danger",
                confirm: true,
            },
        ],
    };

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">Product</h1>

            <p>
                Status: <b>{workflowState.state}</b>
            </p>

            <WorkflowActions
                actions={workflowState.actions}
                onAction={(action) => execute("products", "123", action)}
            />

            <ProductListPage />
        </div>
    );
}
