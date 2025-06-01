# ***git bash-ben/bash-ben mukodik!***
```bash
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
touch .env
echo "API_KEY=<ide masold be az apikulcsot>" >> .env
cd weather
python manage.py runserver
```

:)