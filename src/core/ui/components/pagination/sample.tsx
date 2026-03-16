import Pagination from "./Pagination";
import { useState } from "react";

export default function PaginationSample() {
    const [page, setPage] = useState(1);
    return (
        <div>
            <p>Basic</p>
            <Pagination page={page} totalPages={20} onChange={setPage} />;
        </div>
    );
}
