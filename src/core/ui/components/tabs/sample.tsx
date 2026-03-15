import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/ui/components";
import { useState } from "react";

export default function TabsSample() {
    const [tab, setTab] = useState("general");
    return (
        <div>
            <Tabs value={tab} onChange={setTab}>
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>

                    <TabsTrigger value="security">Security</TabsTrigger>

                    <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    General settings content
                </TabsContent>

                <TabsContent value="security">
                    Security settings content
                </TabsContent>

                <TabsContent value="billing">
                    Billing settings content
                </TabsContent>
            </Tabs>
        </div>
    );
}
