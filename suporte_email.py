"""Notificações opcionais dos chamados de suporte via API HTTP do Resend.

Chamados permanecem no banco de dados, independentemente da entrega de e-mail.
"""
from __future__ import annotations

import os
import requests


def notificar_chamado(protocolo: int, nome: str, email: str, assunto: str, mensagem: str) -> bool:
    """Retorna True somente se o provedor aceitou a mensagem.

    Configuração requer domínio de envio verificado no provedor.
    """
    destinatario = os.environ.get('SUPPORT_EMAIL', '').strip()
    remetente = os.environ.get('SUPPORT_FROM_EMAIL', '').strip()
    chave = os.environ.get('RESEND_API_KEY', '').strip()
    if not all((destinatario, remetente, chave)):
        return False
    corpo = (
        f'Chamado voaAM #{protocolo}\n\n'
        f'Aluno: {nome}\n'
        f'E-mail cadastrado: {email}\n'
        f'Assunto: {assunto}\n\n'
        f'Mensagem:\n{mensagem}\n'
    )
    resposta = requests.post(
        'https://api.resend.com/emails',
        headers={'Authorization': f'Bearer {chave}', 'Content-Type': 'application/json'},
        json={
            'from': remetente,
            'to': [destinatario],
            'subject': f'[voaAM] Chamado #{protocolo}: {assunto[:80]}',
            'text': corpo,
        },
        timeout=8,
    )
    resposta.raise_for_status()
    return True
