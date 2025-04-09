// src/components/FriendCard.jsx
export function FriendCard({ friend, onEdit, onDelete }) {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to remove ${friend.name} from your friends?`)) {
            onDelete();
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative pb-2/3">
                {/* <img
                    // src={friend.imgUrl || `https://avatar.iran.liara.run/public/${friend.gender === 'male' ? 'male' : 'girl'}?username=${friend.name}`}
                    alt={friend.name}
                    className="h-48 w-full object-cover"
                /> */}
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{friend.name}</h3>
                <p className="text-gray-600 mb-2">{friend.role}</p>
                <p className="text-gray-800 mb-4">{friend.description}</p>

                <div className="flex justify-between">
                    <button
                        onClick={onEdit}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

// No default export needed as we're using named export