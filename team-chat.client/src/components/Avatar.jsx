const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-10 w-10 text-sm",
};

// Shows the profile image when there is one, otherwise the person's initial.
function Avatar({ src, name = "", size = "md" }) {
    const base = `${sizes[size]} shrink-0 rounded-full`;

    if (src) {
        return <img src={src} alt="" className={`${base} object-cover`} />;
    }

    const initial = String(name).trim().charAt(0).toUpperCase() || "?";

    return (
        <span
            aria-hidden="true"
            className={`${base} inline-flex items-center justify-center bg-indigo-50 font-semibold text-indigo-600`}
        >
            {initial}
        </span>
    );
}

export default Avatar;