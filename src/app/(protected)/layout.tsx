
export default function Layout({ children }) {
    return (
        <div>
            <div className="max-w-xl mx-auto space-y-2 rounded-md">
                <img src="/logo.svg" alt="logo" className="w-20 h-20 mx-auto" />
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}
