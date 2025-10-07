#!/bin/bash
cd /home/kavia/workspace/code-generation/ai-copilot-chat-4430/ai_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

