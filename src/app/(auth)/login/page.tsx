import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
    return (
        <div className="space-y-6">

            <h1 className="text-3xl font-light">Sign In</h1>
            <div>
                We will send a verification code to your phone.
            </div>
            <LoginForm />
            <div className="space-y-4">
                <div className="text-xs text-center text-gray-400 space-y-2">
                    <div>This site is for existing OOG Health users.</div>
                    <div>Use the OOG Health App to create an account</div>
                </div>
                <div className="flex justify-center">
                    <img src="/appstore.svg" alt="app store" className="h-22" />

                </div>
            </div>
        </div>
    )
}
