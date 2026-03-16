import { InboxIcon } from "@heroicons/react/20/solid";
import EmptyState from "./EmptyState";

export default function EmptyStateSample() {
    return (
        <div>
            <p>Empty Table</p>
            <EmptyState
                icon={<InboxIcon className="w-10 h-10" />}
                title="No items found"
                description="There are no items available yet."
            />

            <p>Empty Search Result</p>
            <EmptyState
                title="No results"
                description="Try adjusting your search query."
            />

            <p>Dengan Action Button</p>
            <EmptyState
                title="No users yet"
                description="Start by creating your first user."
                action={
                    <button className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500">
                        Add User
                    </button>
                }
            />
        </div>
    );
}
