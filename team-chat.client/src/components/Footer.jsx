const developer = "Developed by => devpress_101";

function Footer() {
    return (
        <footer className="border-t border-zinc-800 h-20 bg-zinc-900">
            <p className="mx-auto max-w-5xl px-4 py-5 text-center text-sm text-zinc-400">
                {developer}
            </p>
        </footer>
    );
}

export default Footer;