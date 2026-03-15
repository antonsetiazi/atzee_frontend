import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/core/ui/components";

export default function CardSample() {
    return (
        <div>
            Basic Card
            <Card>
                <CardContent>Hello world</CardContent>
            </Card>
            Dashboard Card
            <Card>
                <CardHeader>Revenue</CardHeader>
                <CardContent>$12,540</CardContent>
            </Card>
            Card dengan Footer
            <Card>
                <CardHeader>User Statistics</CardHeader>
                <CardContent>1,254 Active Users</CardContent>
                <CardFooter>Updated just now</CardFooter>
            </Card>
            Card dengan Action
            <Card>
                <CardHeader className="flex justify-between">
                    <span>Orders</span>
                    <button>⋯</button>
                </CardHeader>
                <CardContent>24 new orders today</CardContent>
            </Card>
        </div>
    );
}
