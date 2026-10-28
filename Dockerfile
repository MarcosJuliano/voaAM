FROM python:3.11-slim

WORKDIR /app

# Instala as dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código da aplicação
COPY . .

# Porta padrão do Flask
EXPOSE 5000

# Executa o app binding no IP 0.0.0.0 para ser acessível fora do container
CMD ["python", "-m", "flask", "--app", "app.py", "run", "--host=0.0.0.0", "--port=5000"]