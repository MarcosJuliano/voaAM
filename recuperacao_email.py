"""Envio de links de redefinição pelo Resend, sem registrar links/tokens em logs."""
import os
import requests


def enviar_recuperacao(destinatario: str, link: str, remetente: str) -> None:
    chave = os.environ.get('RESEND_API_KEY', '').strip()
    if not chave or not remetente:
        raise RuntimeError('Remetente de recuperação não configurado')
    resposta = requests.post(
        'https://api.resend.com/emails',
        headers={'Authorization': f'Bearer {chave}', 'Content-Type': 'application/json'},
        json={
            'from': remetente,
            'to': [destinatario],
            'subject': 'voaAM | Redefinição de senha',
            'text': ('Recebemos um pedido de redefinição da senha do voaAM.\n\n'
                     'Use o link abaixo em até 15 minutos:\n' + link + '\n\n'
                     'Se você não solicitou, ignore este e-mail.\n'),
        },
        timeout=8,
    )
    resposta.raise_for_status()
