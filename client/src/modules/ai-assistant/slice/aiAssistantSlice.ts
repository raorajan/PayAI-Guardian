import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  reasoningSteps?: string[];
  type?: "text" | "approval" | "market";
  data?: any;
}

interface AIAssistantState {
  messages: AssistantMessage[];
  isThinking: boolean;
  currentReasoning: string[];
}

const initialState: AIAssistantState = {
  messages: [
    {
      id: "1",
      role: "assistant",
      content: "Hello! I am your AI Guardian. I monitor your financial security in real-time. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text",
    }
  ],
  isThinking: false,
  currentReasoning: [],
};

const aiAssistantSlice = createSlice({
  name: "aiAssistant",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<AssistantMessage>) => {
      state.messages.push(action.payload);
    },
    setThinking: (state, action: PayloadAction<boolean>) => {
      state.isThinking = action.payload;
    },
    setReasoning: (state, action: PayloadAction<string[]>) => {
      state.currentReasoning = action.payload;
    },
    clearHistory: (state) => {
      state.messages = initialState.messages;
    }
  },
});

export const { addMessage, setThinking, setReasoning, clearHistory } = aiAssistantSlice.actions;
export default aiAssistantSlice.reducer;
