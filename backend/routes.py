from app import app,db
from flask import jsonify, request
from models import Friend


#Get all friends
@app.route('/api/friends', methods=['GET'])
def get_friends():
    print("Fetching all friends")
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    return jsonify(result)



@app.route('/api/friends', methods=['POST'])
def create_friends():
    print("Creating a new friend")
    try:
        data = request.json

        required_fields = ["name","role","description","gender"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400
            

        name = data.get('name')
        role = data.get('role')
        description = data.get('description')
        gender = data.get("gender")
        
        #Fetch avatar from the API
        if gender == "male":
            image_url = f"https://avatar.iran.liara.run/public/male?username={name}"
        elif gender == "female":
            image_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            image_url = None
        
        new_friend = Friend(
            name=name,
            role=role,
            description=description,
            gender = gender,
            image_url=image_url
        )

        db.session.add(new_friend)
        #git add .
        db.session.commit()
        #git commit

        return jsonify(new_friend.to_json()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    
#Delere a friend
@app.route('/api/friends/<int:id>', methods=['DELETE'])
def delete_friend(id):
    try:
        pass
        friend = Friend.query.get(id)
        if not friend:
            return jsonify({"error": "Friend not found"}), 404
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"message": "Friend deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    
#Update a friend
@app.route('/api/friends/<int:id>', methods=['PATCH'])
def update_friend(id):
    try:
        pass
        friend = Friend.query.get(id)
        if not friend:
            return jsonify({"error": "Friend not found"}), 404
        data = request.json
        friend.name = data.get("name", friend.name)
        friend.role = data.get("role", friend.role)
        friend.description = data.get("description", friend.description)
        friend.gender = data.get("gender", friend.gender)

        db.session.commit()
        return jsonify(friend.to_json()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400