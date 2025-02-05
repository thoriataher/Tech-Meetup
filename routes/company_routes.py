from flask import Blueprint, request, jsonify, session
from repository.company_repository import CompanyRepository
from repository.event_repository import EventRepository
from services.company_service import CompanyService
from services.event_service import EventService

company_bp = Blueprint("company", __name__)

@company_bp.route("/<company_id>/events", methods=["POST"])
def create_event(company_id):
    if not CompanyService.is_authorized(company_id, session.get("company_id")):
        return jsonify({"error": {"Unauthorized access": "You are not authorized to access this resource"}}), 401
    
    data = request.get_json()
    required_fields = ["title", "description", "location", "date_time", "company_logo_url", "event_type"]
    
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400
    
    new_event = EventService.create_event(data, company_id)
    
    if isinstance(new_event, tuple):  # Handle error response from service
        return jsonify(new_event[0]), new_event[1]

    return jsonify(new_event), 201


@company_bp.route("/<company_id>/events/<event_id>", methods=["PUT"])
def update_company_events(company_id, event_id):
    if not CompanyService.is_authorized(company_id, session.get("company_id")):
        return jsonify({"error": {"Unauthorized access": "You are not authorized to access this resource"}}), 401
    
    data = request.get_json()
    updated_event = EventRepository.update_event(event_id, data)
    
    if updated_event:
        return jsonify({"message": "Event updated successfully", "event": updated_event}), 200
    return jsonify({"error": "Failed to update event"}), 500

@company_bp.route("/<company_id>/events/<event_id>", methods=["DELETE"])
def delete_company_event(company_id, event_id):
    if not CompanyService.is_authorized(company_id, session.get("company_id")):
        return jsonify({"error": {"Unauthorized access": "You are not authorized to access this resource"}}), 401
    
    if EventRepository.delete_event(event_id):
        return jsonify({"message": "Event deleted successfully."}), 200
    return jsonify({"error": "Failed to delete the event"}), 500