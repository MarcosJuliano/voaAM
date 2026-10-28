FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN mkdir -p /app/instance

EXPOSE 5000

CMD ["python", "-m", "flask", "--app", "app:app", "run", "--host=0.0.0.0", "--port=5000", "--debug"]
