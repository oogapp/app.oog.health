import VerifyForm from "@/components/VerifyForm";
import { cookies } from "next/headers";

export default function VerifyPage() {
    let phone = cookies().get('phone')?.value
    console.log(phone)
    return (
        <VerifyForm phone={phone} />
    )
}
