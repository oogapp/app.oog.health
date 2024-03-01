export default function AuthLayout({ children }) {
    return (
        <div>
            <div className="max-w-xl mx-auto p-3 rounded-md m-3">
                <img src="/logo.svg" alt="logo" className="w-20 h-20 mx-auto" />
                {children}
            </div>
        </div>
    )
}
