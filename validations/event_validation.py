from datetime import datetime
import re

class EventValidation:
    
    @staticmethod
    def validate_event(event_data):
        errors = {}
        
        if not event_data.get("title") or len(event_data["title"]) < 3:
            errors["title"] = "Title must be at least 3 characters long"
        
        if not event_data.get("description") or len(event_data["description"]) < 10:
            errors["description"] = "Description must be at least 10 characters long"
            
        if not event_data.get("location"):
            errors["location"] = "Location is required"
            
        if not event_data.get("company_id"):
            errors["company_id"] = "Company ID is required"
            
        if event_data.get("event_type") not in ["online", "offline", "hybrid"]:
            errors["event_type"] = "Event type must be 'online', 'offline', or 'hybrid'"
            
        if not event_data.get("company_logo_url"):
            errors["company_logo_url"] = "Company logo URL is required"
            
        try:
            datetime.strptime(event_data["date_time"], "%Y-%m-%dT%H:%M:%S")
        except ValueError:
            errors["date_time"] = "Invalid date and time format. Use 'YYYY-MM-DD, HH:MM:SS'"
            
        return errors if errors else None