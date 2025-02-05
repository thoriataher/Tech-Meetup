from repository.event_repository import EventRepository
from models.event import Event
import uuid

class EventService:
    
    @staticmethod
    def create_event(event_data, company_id):
        if EventRepository.event_exist(event_data["title"], event_data["date_time"]):
            return {"error": {"Event already exists": f"{event_data['title']} at {event_data['date_time']}"}}, 400
        
        new_event = {
            "id": str(uuid.uuid4()),
            "company_id": company_id,
            "title": event_data["title"],
            "description": event_data["description"],
            "location": event_data["location"],
            "date_time": event_data["date_time"],
            "company_logo_url": event_data["company_logo_url"],
        }
        
        saved_event = EventRepository.add_event(new_event)
        return saved_event if saved_event else {"error": {"Failed to create the event"}}, 500
    
    @staticmethod
    def get_event_by_id(event_id):
        event = EventRepository.find_event(event_id)
        return event if event else {"error": {"Event not found": event_id}}, 404
    
    @staticmethod
    def get_events_by_company_id(company_id):
        event = EventRepository.find_by_company_id(company_id)
        return event if event else {"error": {"No events found for this company": company_id}}, 404
    @staticmethod
    def update_event(event_id, updated_data):
        event = EventRepository.find_event(event_id)
        if not event:
            return {"error": {"Event not found": event_id}}, 404
        
        updated_event = Event(
            title=updated_data.get("title", event["title"]),
            description=updated_data.get("description", event["description"]),
            location=updated_data.get("location", event["location"]),
            date_time=updated_data.get("date_time", event["date_time"]),
            event_type=updated_data.get("event_type", event["event_type"]),
            company_id=updated_data.get("company_id", event["company_id"]),
        )
        
        updated_events= EventRepository.update_event(event_id, updated_event.__dict__)
        return updated_events if updated_events else {"error": {"Failed to update the event": event_id}}, 500
    
    @staticmethod
    def delete_event(event_id):
       if EventRepository.delete_event(event_id):
           return {"message": "Event deleted successfully."}, 200
       return {"error": "Failed to delete the event"}, 500