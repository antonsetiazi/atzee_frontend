// src/business/entities/EntityPage.tsx

import CoreEntityPage from "./CoreEntityPage";

interface Props {
    entityKey: string;
}

export default function EntityPage({ entityKey }: Props) {
    return <CoreEntityPage key={entityKey} entityKey={entityKey} />;
}
