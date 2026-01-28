export function useWorkflowAction() {
    async function execute(entity: string, id: string, action: string) {
        console.log(`[WORKFLOW] ${entity}#${id} → ${action}`);

        // nanti:
        // POST /api/{entity}/{id}/actions/{action}/
    }

    return { execute };
}
