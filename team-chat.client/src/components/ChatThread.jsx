import { useMessages } from "../hooks/useMessages";

export default function ChatThread() {
    const { messages } = useMessages();
    return (

        <div className="mx-auto p-6 bg-white">
            {
                messages.map((message) => (

                    <div key={message.id}>
                        {message.text}
                    </div>
                ))
            }
        </div>
    );
}