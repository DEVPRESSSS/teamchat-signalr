import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom"
import { Radio, Menu, X } from "lucide-react";
import { useAuth } from "../context/authContext";

const REPO_URL = "https://github.com/DEVPRESSSS/teamchat-signalr";

const mainLinks = [
    { to: "/", name: "Home" },
    { to: "/aboutus", name: "About" },
];

const authLinks = [
    { to: "/login", name: "Login" },
];

const linkClass = (isActive, mobile) =>
    `rounded-lg text-sm font-medium transition-colors ${mobile ? "block px-3 py-2.5" : "px-3 py-1.5"} ${isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
    }`;

const buttonClass =
    "inline-flex h-9 items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100";

// GitHub mark (same path as public/icons.svg), drawn in the current text colour.
function GitHubIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 19 19" fill="currentColor" aria-hidden="true">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844"
            />
        </svg>
    );
}

function NavBar() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    console.log(user);
    // Let Escape close the mobile menu.
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open]);

    return (
        <header className="border-b border-zinc-800 bg-zinc-900">
            {/* Mobile: logo + hamburger. Desktop: logo | centred links | actions. */}
            <nav
                aria-label="Primary"
                className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:grid md:grid-cols-[1fr_auto_1fr]"
            >
                <Link to="/" onClick={close} className="flex items-center gap-2.5 justify-self-start rounded-lg text-white">
                    <span
                        aria-hidden="true"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500"
                    >
                        <Radio size={16} />
                    </span>
                    <span className="text-base font-semibold tracking-tight">TeamChat</span>
                </Link>

                <ul className="hidden items-center justify-center gap-1 md:flex">
                    {mainLinks.map(({ to, name }) => (
                        <li key={to}>
                            <NavLink to={to} end={to === "/"} className={({ isActive }) => linkClass(isActive, false)}>
                                {name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="hidden items-center justify-end gap-2 md:flex">
                    <a
                        href={REPO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TeamChat on GitHub"
                        title="View the repository on GitHub"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                    >
                        <GitHubIcon />
                    </a>
                    {!user && (
                        <>
                            {authLinks.map(({ to, name }) => (
                                <NavLink key={to} to={to} className={({ isActive }) => linkClass(isActive, false)}>
                                    {name}
                                </NavLink>
                            ))}
                            <Link to="/register" className={buttonClass}>Register</Link>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={open ? "Close menu" : "Open menu"}
                    className="-mr-2 rounded-lg p-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white md:hidden"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {open && (
                <div id="mobile-menu" className="border-t border-zinc-800 md:hidden">
                    <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3">
                        {mainLinks.map(({ to, name }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/"}
                                onClick={close}
                                className={({ isActive }) => linkClass(isActive, true)}
                            >
                                {name}
                            </NavLink>
                        ))}

                        <a
                            href={REPO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={close}
                            className={`${linkClass(false, true)} flex items-center gap-2`}
                        >
                            <GitHubIcon size={16} />
                            GitHub
                        </a>

                        {!user && (
                            <div className="mt-2 flex flex-col gap-2 border-t border-zinc-800 pt-3">
                                {authLinks.map(({ to, name }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        onClick={close}
                                        className={({ isActive }) => linkClass(isActive, true)}
                                    >
                                        {name}
                                    </NavLink>
                                ))}
                                <Link to="/register" onClick={close} className={`${buttonClass} h-10`}>
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default NavBar;