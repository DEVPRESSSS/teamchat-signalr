import *  as signalR from "@microsoft/signalr"
export function signalRClient() {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/chatHub")
        .build();
    return connection;
}