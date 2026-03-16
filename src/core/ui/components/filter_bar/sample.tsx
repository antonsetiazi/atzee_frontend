import { FilterBar, FilterGroup } from "@/core/ui/components";

export default function FilterBarSample() {
    return (
        <div>
            <FilterBar>
                <FilterGroup>
                    <input
                        placeholder="Search..."
                        className="
                            px-3 py-2
                            rounded-default
                            bg-surface-alt
                            border border-default
                            text-sm
                            text-primary
                            outline-none
                        "
                    />
                </FilterGroup>

                <FilterGroup align="right">
                    <button
                        className="
                            px-3 py-2
                            rounded-default
                            border border-default
                            bg-surface-alt
                            text-sm
                            hover:bg-surface
                            transition
                        "
                    >
                        Reset
                    </button>
                </FilterGroup>
            </FilterBar>
        </div>
    );
}
