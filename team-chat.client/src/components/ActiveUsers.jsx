function ActiveUsers() {
    const activeUsers = [
        { id: "1", name: "Scolfield" },
        { id: "2", name: "Sahur" },
        { id: "3", name: "Otlum" },
        { id: "4", name: "Seth" },
    ];
    return (
        <div className="grid grid-cols-4 gap-4 mb-4">
            {
                activeUsers.map((user) => (
                    <div className="">
                        <div key={user.id }>
                            <img src="https://i.pravatar.cc/32"
                                alt="User avatar"
                                className="w-8 h-8 rounded-full object-cover" />
                        </div>
                        <p className="text-sm text-gray-500">{user.name}</p>
                    </div>
                ))
            }
                   
        </div>
    );
}
export default ActiveUsers;