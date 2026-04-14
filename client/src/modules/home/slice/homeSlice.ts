import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as homeAction from "./homeAction";

// Initial state
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface HomeState {
  stats: any | null;
  features: any[] | null;
  testimonials: any[] | null;
  chatMessages: ChatMessage[];
  loading: boolean;
  chatLoading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: HomeState = {
  stats: null,
  features: null,
  testimonials: null,
  chatMessages: [
    {
      id: "1",
      role: "assistant",
      content: "👋 Hi there! I'm your AI banking assistant. I see you're new here — want me to show you around or answer any questions?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ],
  loading: false,
  chatLoading: false,
  error: null,
  message: null,
};

export const fetchHomeStats = createAsyncThunk(
  "home/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await homeAction.getHomeStats();
      return response.data || response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response?.data || { message: "Failed to fetch stats" }
      );
    }
  }
);

export const fetchFeatures = createAsyncThunk(
  "home/fetchFeatures",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await homeAction.getFeatures();
      return response.data || response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response?.data || { message: "Failed to fetch features" }
      );
    }
  }
);

export const fetchTestimonials = createAsyncThunk(
  "home/fetchTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await homeAction.getTestimonials();
      return response.data || response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response?.data || { message: "Failed to fetch testimonials" }
      );
    }
  }
);

export const sendOnboardingMessage = createAsyncThunk(
  "home/sendOnboardingMessage",
  async (data: { messages: any[] }, { rejectWithValue }) => {
    try {
      const response: any = await homeAction.sendOnboardingMessage(data);
      return response.data || response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response?.data || { message: "Failed to send message" }
      );
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    clearHomeState: (state) => {
      state.error = null;
      state.message = null;
    },
    addUserMessage: (state, action: { payload: ChatMessage }) => {
      state.chatMessages.push(action.payload);
    },
    addAssistantMessage: (state, action: { payload: ChatMessage }) => {
      state.chatMessages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Stats
      .addCase(fetchHomeStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload?.data || action.payload;
      })
      .addCase(fetchHomeStats.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch stats";
      })

      // Fetch Features
      .addCase(fetchFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.features = action.payload?.data || action.payload;
      })
      .addCase(fetchFeatures.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch features";
      })

      // Fetch Testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload?.data || action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch testimonials";
      })
      
      // Send Onboarding Message
      .addCase(sendOnboardingMessage.pending, (state) => {
        state.chatLoading = true;
      })
      .addCase(sendOnboardingMessage.fulfilled, (state, action) => {
        state.chatLoading = false;
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: action.payload?.message || action.payload,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        state.chatMessages.push(aiMsg);
      })
      .addCase(sendOnboardingMessage.rejected, (state, action: any) => {
        state.chatLoading = false;
        const errorMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm having a bit of trouble connecting. But feel free to explore!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        state.chatMessages.push(errorMsg);
      });
  },
});

export const { clearHomeState, addUserMessage, addAssistantMessage } = homeSlice.actions;
export default homeSlice.reducer;
