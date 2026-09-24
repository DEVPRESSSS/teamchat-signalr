import { Monitor, Server, Database, Wrench } from "lucide-react";
import Badge from "./Badge";

const heroStack = ["React", "ASP.NET Core", "SignalR", "SQL Server"];

const stack = [
    {
        title: "Frontend",
        icon: Monitor,
        description: "A single-page app that talks to the API and listens for live messages.",
        items: ["React 19", "Vite", "Tailwind CSS", "React Router", "Axios", "SignalR client", "Lucide", "React Hot Toast", "SweetAlert2"],
    },
    {
        title: "Backend",
        icon: Server,
        description: "A REST API with a SignalR hub, JWT authentication and a repository pattern.",
        items: ["ASP.NET Core Web API", ".NET 10", "Entity Framework Core", "SignalR", "JWT Bearer", "BCrypt", "OpenAPI + Scalar"],
    },
    {
        title: "Database",
        icon: Database,
        description: "Users, roles, conversations and messages, managed with code-first migrations.",
        items: ["SQL Server", "EF Core migrations"],
    },
    {
        title: "Tooling",
        icon: Wrench,
        description: "What the project is written and versioned with.",
        items: ["Visual Studio", "Visual Studio Code", "Git", "GitHub"],
    },
];

function Home() {

    return (
        <div className="mx-auto w-full max-w-5xl py-8 sm:py-12">
            <section className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                    Team chat that updates in real time
                </h1>
                <p className="mt-4 text-base leading-relaxed text-zinc-500">
                    TeamChat is a simple chat web app built with ASP.NET Core Web API, React and SignalR.
                    Pick a teammate, send a message, and it arrives instantly.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {heroStack.map((name) => (
                        <Badge key={name} variant="accent">{name}</Badge>
                    ))}
                </div>

            </section>

            <section aria-labelledby="stack-heading" className="mt-16 sm:mt-20">
                <h2 id="stack-heading" className="text-xl font-semibold tracking-tight text-zinc-900">
                    Built with
                </h2>
                <p className="mt-1 text-sm text-zinc-500">The technologies behind each layer of the app.</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {stack.map(({ title, icon: Icon, description, items }) => (
                        <article key={title} className="rounded-xl border border-zinc-200 bg-white p-6">
                            <div className="flex items-center gap-3">
                                <div
                                    aria-hidden="true"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700"
                                >
                                    <Icon size={18} />
                                </div>
                                <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-zinc-500">{description}</p>
                            <ul className="mt-4 flex flex-wrap gap-2">
                                {items.map((item) => (
                                    <li key={item}>
                                        <Badge>{item}</Badge>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;