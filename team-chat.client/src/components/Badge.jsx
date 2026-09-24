const variants = {
    neutral: "border-zinc-200 bg-zinc-50 text-zinc-700",
    accent: "border-indigo-100 bg-indigo-50 text-indigo-700",
};

function Badge({ children, variant = "neutral" }) {
    return (
        <span
            className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium ${variants[variant]}`}
        >
            {children}
        </span>
    );
}

export default Badge;