import { Banner } from "@/core/ui/components";

export default function BannerSample() {
    return (
        <div>
            <p>Info Banner</p>
            <Banner title="Information">Your profile is incomplete.</Banner>

            <p>Success Banner</p>
            <Banner variant="success" title="Payment Successful">
                Your transaction has been completed.
            </Banner>

            <p>Warning Banner</p>
            <Banner variant="warning" title="Low Balance">
                Your wallet balance is below Rp 10.000
            </Banner>

            <p>Error Banner</p>
            <Banner variant="error" title="Server Error">
                Unable to process request.
            </Banner>

            <p>Dismissible Banner</p>
            <Banner dismissible title="New Feature">
                Global search is now available.
            </Banner>
        </div>
    );
}
