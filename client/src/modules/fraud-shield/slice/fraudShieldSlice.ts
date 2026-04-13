import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SecurityEvent {
  id: string;
  type: "verification" | "block" | "whitelist" | "anomaly";
  title: string;
  description: string;
  timestamp: string;
  severity: "low" | "medium" | "high";
  status: "active" | "resolved" | "overridden";
}

interface FraudShieldState {
  riskScore: number;
  events: SecurityEvent[];
  activeThreat: SecurityEvent | null;
}

const initialState: FraudShieldState = {
  riskScore: 12,
  events: [
    {
      id: "ev1",
      type: "verification",
      title: "Biometric Success",
      description: "FaceID verified for high-value transfer.",
      timestamp: "10:15 AM",
      severity: "low",
      status: "resolved"
    },
    {
      id: "ev2",
      type: "block",
      title: "Velocity Block",
      description: "Intercepted 4 rapid API attempts from unknown mobile node.",
      timestamp: "09:42 AM",
      severity: "high",
      status: "active"
    },
    {
      id: "ev3",
      type: "whitelist",
      title: "Geo-Fence Pass",
      description: "IP matches primary residence zone (London, UK).",
      timestamp: "08:12 AM",
      severity: "low",
      status: "resolved"
    }
  ],
  activeThreat: null,
};

const fraudShieldSlice = createSlice({
  name: "fraudShield",
  initialState,
  reducers: {
    setRiskScore: (state, action: PayloadAction<number>) => {
      state.riskScore = action.payload;
    },
    addEvent: (state, action: PayloadAction<SecurityEvent>) => {
      state.events.unshift(action.payload);
    },
    resolveEvent: (state, action: PayloadAction<string>) => {
      const ev = state.events.find(e => e.id === action.payload);
      if (ev) ev.status = "resolved";
    },
    overrideEvent: (state, action: PayloadAction<string>) => {
      const ev = state.events.find(e => e.id === action.payload);
      if (ev) ev.status = "overridden";
    }
  },
});

export const { setRiskScore, addEvent, resolveEvent, overrideEvent } = fraudShieldSlice.actions;
export default fraudShieldSlice.reducer;
