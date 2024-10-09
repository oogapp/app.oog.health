import Link from "next/link";

export default function AuthLayout({ children }) {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="w-[400px] mx-auto p-5 rounded-lg border border-gray-800 bg-black rounded-md space-y-8">
                <div className="space-y-4 flex flex-col justify-center">
                    <img src="/logo-pill.png" alt="logo" className="h-14 mx-auto" />
                    <div className="text-center text-sm">A community by &amp; for Healthcare Professionals</div>
                </div>
                <div>{children}</div>
                <div className="mt-10 border-t py-3 space-y-4">
                    <div className="text-xs text-gray-400">
                        The world’s first cinematic medical content library for you to learn, share, and connect with your colleagues.
                    </div>
                    <div className="flex text-xs text-gray-400 gap-x-4">
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
