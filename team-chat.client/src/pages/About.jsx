import Avatar from "../components/Avatar";

const developer = "devpress_101";

const goals = [
    { title: "REST API design", text: "Controllers, services and repositories in ASP.NET Core Web API." },
    { title: "Real-time messaging", text: "A SignalR hub that delivers messages to a conversation as they are sent." },
    { title: "Data and migrations", text: "Entity Framework Core code-first migrations on SQL Server." },
    { title: "Authentication", text: "JWT access and refresh tokens kept in HTTP-only cookies." },
    { title: "React frontend", text: "Hooks, context and routing connected to a real backend." },
    { title: "Git and GitHub", text: "Building a project in small, versioned steps." },
];

function About() {
    return (
        <div className="mx-auto w-full max-w-3xl py-8 sm:py-12">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">About TeamChat</h1>

            <section aria-labelledby="why-heading" className="mt-8">
                <h2 id="why-heading" className="text-xl font-semibold tracking-tight text-zinc-900">
                    Why I built this
                </h2>
                <div className="mt-3 max-w-prose space-y-3 text-base leading-relaxed text-zinc-600">
                    <p>
                        TeamChat is a hands-on learning project. I wanted to build a complete full-stack
                        application from start to finish, instead of following isolated tutorials.
                    </p>
                    <p>
                        A chat app touches everything I wanted to practise: a REST API, a React frontend,
                        a SQL Server database, user authentication, and real-time communication with SignalR.
                    </p>
                </div>
            </section>

            <section aria-labelledby="goals-heading" className="mt-12">
                <h2 id="goals-heading" className="text-xl font-semibold tracking-tight text-zinc-900">
                    What I set out to learn
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {goals.map(({ title, text }) => (
                        <li key={title} className="rounded-xl border border-zinc-200 bg-white p-5">
                            <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-zinc-500">{text}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="dev-heading" className="mt-12">
                <h2 id="dev-heading" className="text-xl font-semibold tracking-tight text-zinc-900">
                    Developer
                </h2>
                <div className="mt-6 flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5">
                    <Avatar name={developer} size="lg" />
                    <div>
                        <p className="text-sm font-semibold text-zinc-900">{developer}</p>
                        <p className="text-sm text-zinc-500">Designed, built and maintains TeamChat.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;