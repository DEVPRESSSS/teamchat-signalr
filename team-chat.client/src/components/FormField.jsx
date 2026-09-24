import { useId } from "react";

function FormField({ label, hint, ...inputProps }) {
    const id = useId();
    const hintId = `${id}-hint`;

    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-medium text-zinc-700">
                {label}
            </label>
            <input
                id={id}
                aria-describedby={hint ? hintId : undefined}
                className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none
                           transition-colors placeholder:text-zinc-400
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                {...inputProps}
            />
            {hint && (
                <p id={hintId} className="text-xs text-zinc-500">{hint}</p>
            )}
        </div>
    );
}

export default FormField;