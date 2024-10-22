import Link from "next/link";

export default function AuthLayout({ children }) {
    return (
        <div className="h-screen w-full flex">
            <div className="w-[400px] mx-auto p-5 rounded-lg bg-black rounded-md space-y-8">
                <div className="space-y-4 flex flex-col justify-center">
                    <img src="/logo.svg" alt="logo" className="h-28 mx-auto" />
                </div>
                <div>{children}</div>
                <div className="mt-10 py-3 space-y-4">
                    <div className="flex justify-center text-xs text-gray-400 gap-x-4">
                        <Link className="underline" href={'/terms'}>
                            Terms &amp; Conditions
                        </Link>
                        <Link className="underline" href={'/privacy'}>
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
