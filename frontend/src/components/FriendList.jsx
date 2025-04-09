// src/components/FriendList.jsx
import { FriendCard } from './FriendCard';

function FriendList({ friends, onEdit, onDelete }) {
    if (friends.length === 0) {
        return (
            <div className="text-center py-6">
                <p className="text-gray-500">No friends added yet. Add your first friend above!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {friends.map(friend => (
                <FriendCard
                    key={friend.id}
                    friend={friend}
                    onEdit={() => onEdit(friend)}
                    onDelete={() => onDelete(friend.id)}
                />
            ))}
        </div>
    );
}

export default FriendList;