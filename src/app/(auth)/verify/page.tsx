import VerifyForm from "@/components/VerifyForm";
import { cookies } from "next/headers";

export default function VerifyPage() {
    let phone = cookies().get('phone')?.value
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-light">Enter Your Verification Number</h1>
            <div>
                Type in the 6 digit code we texted you.
            </div>
            <VerifyForm phone={phone} />
        </div>
    )
}
