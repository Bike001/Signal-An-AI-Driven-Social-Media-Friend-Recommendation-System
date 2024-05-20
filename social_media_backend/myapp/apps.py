# myapp/apps.py
from django.apps import AppConfig

class MyappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'myapp'

    def ready(self):
        # Make sure your signals import path is correct
        import myapp.signals  # Assuming your signals are in myapp/signals.py
