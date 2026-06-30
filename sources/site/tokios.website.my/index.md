# Source: https://tokios.website.my/

The Gateway for your local language models

# Your models. 
Your hardware. 
One endpoint.

Tokios puts your private models behind one OpenAI- and Anthropic-compatible API, reached over a tunnel your connector dials **out**. Point Claude Code, Codex, or any compatible coding agent at it and run your models on hardware you control — no inbound ports, no model exposed, no orchestration to run.

Sign up →[Read the docs](https://tokios.website.my/#how)

// outbound-only by design · your model and prompts never leave your machines

claude-code.cmd

:: point Claude Code at your own model
set ANTHROPIC\_BASE\_URL\=https://api.tokios.com
set ANTHROPIC\_API\_KEY\=sk-tokios-...

claude \--model gemma-tunnel
:: now running on your hardware

Outbound connection over WebSocketsInbound requests

Your network · NAT

RTX 6000gemma4:e4b

localhostllama.cpp

✕no inbound

Tokios

api.tokios.com

sk-tokios-•••••

Claude CodeCodex

The gap

BYOK stops at the _firewall_.

Cloud gateways can route to providers you hold keys for — but they can't reach a model running on a box in your office or VPC. There's no inbound route to localhost, and you shouldn't have to open one.

Tokios closes that gap by flipping the direction. Your connector reaches out to Tokios, and the connection it opens carries every request back down to your hardware. Nothing on your side listens for inbound traffic.

How it works

## Three steps to one endpoint.

No static IP, no port forwarding, no tunnel to babysit. Pair a connector and you're routable.

01

### Sign up & pair a connector

Create your account, then run the connector next to your model — Ollama, llama.cpp, vLLM, LM Studio. It opens one outbound WebSocket to Tokios. No inbound ports, public IP, or NAT setup.

$ ./tokios-connector --config tokios.json

02

### Register a model, mint a key

Pairing registers your model as a deployment behind one stable URL and gives you a tenant-scoped API key. Local models stay on localhost by default.

→ https://api.tokios.com

03

### Point your coding agent at it

Set Claude Code, Codex, or any compatible coding agent to the Tokios endpoint and key. Each request is translated to your model's format and routed down the live tunnel — and the response streams straight back.

claude --model gemma-tunnel

Why Tokios

## Built for inference you keep close.

Everything follows from one decision: traffic only ever flows down a connection your machine opened.

### Outbound-only tunnel

Your connector dials out. No inbound ports, no public IP, no NAT setup — nothing new exposed on your network.

### One compatible endpoint

OpenAI- and Anthropic-compatible surfaces behind one URL: `/v1/chat/completions`, `/v1/messages`, `/v1/responses`. Swap the model underneath without touching client config.

### Managed Infrastructure

The Tokios gateway server is hosted on reliable, managed infrastructure. Zero ops burden so you can focus on inference.

Downloads

## Download the Tokios Connector App

The Connector is a lightweight console app you run right next to your own model. It opens a single secure, outbound websocket connection to Tokios so that your model stays completely private, with no inbound ports, public IP, or firewall.

### Windows

Windows 10 & 11 · x64

[Download ↓](https://tokios.website.my/#downloads)

### macOS

Apple silicon · arm64

[Download ↓](https://tokios.website.my/#downloads)

### Linux

Linux · x64

[Download ↓](https://tokios.website.my/#downloads)

## Bring your models. 
Keep your ports closed and secured.

Sign up, pair a connector, and point Claude Code, Codex, or any compatible coding agent at your own model today. Free community tier access - no card required.

Sign up →[Read the docs](https://tokios.website.my/#how)