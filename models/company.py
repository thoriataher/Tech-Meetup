import uuid 
from datetime import datetime

class Company:
    
    def __init__(self, name, email, hashed_password, photo, description, website_link, event_id=None):
        self.id = str(uuid.uuid4())
        self.name = name
        self.email = email
        self.password = hashed_password
        self.photo = photo
        self.description = description
        self.website_link = website_link
        self.create_at = datetime.now().utcnow().isoformat()
        self.update_at = datetime.now().utcnow().isoformat()
        self.event_id = event_id