import { Radio, CircleAlert } from "lucide-react";

// Shared shell for the login and register pages.
function AuthCard({ title, subtitle, error, footer, children }) {
    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
                <div
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white"
                >
                    <Radio size={18} />
                </div>

                <h1 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-900">{title}</h1>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{subtitle}</p>

                {error && (
                    <div
                        role="alert"
                        className="mt-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
                    >
                        <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <p>{error}</p>
                    </div>
                )}

                <div className="mt-6">{children}</div>

                <p className="mt-6 border-t border-zinc-100 pt-6 text-center text-sm text-zinc-500">
                    {footer}
                </p>
            </div>
        </div>
    );
}

export default AuthCard;