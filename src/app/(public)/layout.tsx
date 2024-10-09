import Link from "next/link";

export default function PublicLayout({ children }) {
    return (
        <div>
            <div className="max-w-xl mx-auto p-3 rounded-md m-3 space-y-4">
                <img src="/logo.svg" alt="logo" className="w-20 h-20 mx-auto" />
                <div>
                    <Link className="underline" href="/">
                        Back to Home
                    </Link>
                </div>
                <div>{children}</div>
                <div className="mt-10 border-t py-3">
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
