import { AppBar, SearchBar } from "@/core/ui/components";

export default function SearchBarSample() {
    return (
        <div>
            <SearchBar onSubmit={(q) => console.log(q)} />
            <SearchBar icon="🔎" placeholder="Search orders..." />

            <AppBar title={<SearchBar placeholder="Search users..." />} />
        </div>
    );
}
