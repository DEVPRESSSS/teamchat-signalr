import { useMessages } from "../hooks/useMessages";

export default function ChatThread() {
    const { messages } = useMessages();
    console.log(messages);
    return (
            <div className="mx-auto p-6 bg-gray-100">
            {
                messages.map((message) => (

                    <div className="flex flex-row justify-end bg-purple-800 text-white"
                        key={message.text}>

                        {

                             <div>
                                {
                                    message.text

                                }
                            </div>

                          }        
                            </div>
                        ))
                    }      
             </div>
    );
}