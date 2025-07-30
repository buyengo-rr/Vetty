# middleware/auth.py

from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

# ─────────────────────────────────────────────
def token_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            current_user = get_jwt_identity()
        except Exception as e:
            return jsonify({"error": "Token is missing or invalid", "details": str(e)}), 401

        return fn(current_user, *args, **kwargs)
    return wrapper

# ─────────────────────────────────────────────
def admin_required(fn):
    @wraps(fn)
    def wrapper(current_user, *args, **kwargs):
        if not current_user:
            return jsonify({"error": "Authentication required"}), 401

        role = current_user.get("role")
        if role != "admin":
            return jsonify({"error": "Admin access only"}), 403

        return fn(current_user, *args, **kwargs)
    return wrapper
