interface Props {
    message?: string;
}

export default function EmptyState({ message = "No data available" }: Props) {
    return <div className="p-8 text-center text-gray-400">{message}</div>;
}
