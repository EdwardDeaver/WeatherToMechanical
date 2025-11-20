import logging
from logging_loki import LokiHandler

# Create a custom logger
logger = logging.getLogger("my_app")
logger.setLevel(logging.DEBUG)

# Configure the Loki handler
loki_handler = LokiHandler(
    url="http://localhost:3100/loki/api/v1/push",  # Default Loki port
    tags={"application": "my-python-app", "host": "raspberry-pi"},
    version="1",
)

# Optionally add console handler for local debugging
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

# Add handlers to logger
logger.addHandler(loki_handler)
logger.addHandler(console_handler)

# Now use the logger in your application
logger.info("Application started")
logger.error("An error occurred", extra={"user": "john", "action": "login"})
