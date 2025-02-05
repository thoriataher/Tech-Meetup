import  uuid
from datetime import datetime

class Event:
    
    def __init__(self, title, description, location, date_time, company_logo_url, event_type, company_id):
        self.id = str(uuid.uuid4())
        self.title = title
        self.description = description
        self.location = location
        self.date_time = date_time
        self.company_logo_url = company_logo_url
        self.event_type = event_type # "online", "offline", "hybrid"
        self.company_id = company_id
        self.create_at = datetime.now(datetime.timezone.utc).isoformat()
        self.update_at = datetime.now(datetime.timezone.utc).isoformat()