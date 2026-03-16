import { DateRangePicker, FilterBar, FilterGroup } from "@/core/ui/components";

export default function DateRangePickerSample() {
    return (
        <div>
            <FilterBar>
                <FilterGroup>
                    <DateRangePicker onChange={(range) => console.log(range)} />
                </FilterGroup>
            </FilterBar>
        </div>
    );
}
