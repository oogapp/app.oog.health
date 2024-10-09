import Link from "next/link";

export default function Layout({ children }) {
    return (
        <div>
            <div className="max-w-xl mx-auto p-3 space-y-8 rounded-md m-3">
                <img src="/logo.svg" alt="logo" className="w-20 h-20 mx-auto" />
                <div>
                    {children}
                </div>
                <div className="mt-10 border-t py-3">
                    <div>
                        <Link prefetch={false} className="underline" href={'/logout'}>
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
