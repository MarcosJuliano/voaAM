# Atendimento e notificações por e-mail

O formulário do Perfil envia um chamado autenticado ao endpoint `POST /api/suporte`.

- O chamado é **sempre gravado no SQLite** antes de qualquer chamada externa.
- Limite de **5 chamados por conta por hora** para reduzir abuso.
- O sistema tenta notificar o administrador usando a API HTTP do Resend. Falhas são marcadas como **pendentes** e não apagam o chamado.
- Um administrador pode consultar `GET /api/admin/suporte` com sessão administrativa; o resultado inclui e-mail cadastrado e estado de notificação.

## Configuração segura

Defina no `.env` do backend ou no painel de variáveis do seu host:

```dotenv
SUPPORT_EMAIL=seu-endereco@provedor.com
SUPPORT_FROM_EMAIL=voaAM <notificacoes@dominio-verificado.com>
RESEND_API_KEY=SEU_TOKEN_PRIVADO
```

`SUPPORT_EMAIL` é o destino das mensagens, **não precisa ser igual ao endereço remetente**. O `SUPPORT_FROM_EMAIL` deve ser autorizado pelo serviço de entrega e pode exigir validação de domínio. Não publique a chave em código, JavaScript ou GitHub.

Copie as três variáveis para seu `docker-compose.yml` (já preparado) ou para o servidor de produção. Para tentar reenviar chamados antigos que ficaram pendentes, rode:

```bash
python -m flask --app app suporte reenviar
# ou via Docker: docker compose exec web python -m flask --app app suporte reenviar
```

O usuário recebe o **número de protocolo**, mesmo se o e-mail estiver indisponível. O envio ao seu endereço não foi habilitado neste arquivo porque nenhum e-mail pessoal confirmado foi fornecido. Substitua os valores de exemplo antes de testar.
