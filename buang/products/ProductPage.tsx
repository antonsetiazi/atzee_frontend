// import TableRenderer from "@/business/tables/TableRenderer";
// import { productTableSchema } from "./product.table";
// import WorkflowContainer from "@/business/workflows/WorkflowContainer";
// import type { WorkflowSchema } from "@/business/workflows/workflow.types";

// export default function ProductPage() {
//     // contoh dummy (nanti dari backend)
//     const workflow: WorkflowSchema = {
//         status: { key: "draft", label: "Draft", color: "gray" },
//         actions: [
//             {
//                 key: "submit",
//                 label: "Submit",
//                 permission: "product.submit",
//                 confirm: "Submit produk ini?",
//             },
//         ],
//     };

//     return (
//         <div className="space-y-4">
//             <WorkflowContainer
//                 workflow={workflow}
//                 onAction={(action) => {
//                     console.log("workflow action:", action.key);
//                 }}
//             />

//             <TableRenderer schema={productTableSchema} data={[]} />
//         </div>
//     );
// }
