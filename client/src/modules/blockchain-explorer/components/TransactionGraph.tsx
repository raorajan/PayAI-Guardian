"use client";
import React, { useState, useRef } from "react";

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  type: "user" | "merchant" | "exchange";
  totalAmount: number;
}

interface Edge {
  id: string;
  from: string;
  to: string;
  amount: number;
  status: "confirmed" | "pending" | "flagged";
}

const NODES: Node[] = [
  { id: "n1", name: "You", x: 400, y: 300, type: "user", totalAmount: 24847 },
  { id: "n2", name: "Amazon", x: 200, y: 150, type: "merchant", totalAmount: 127 },
  { id: "n3", name: "Starbucks", x: 600, y: 150, type: "merchant", totalAmount: 45 },
  { id: "n4", name: "Coinbase", x: 200, y: 450, type: "exchange", totalAmount: 850 },
  { id: "n5", name: "Sarah M.", x: 600, y: 450, type: "user", totalAmount: 120 },
  { id: "n6", name: "Walmart", x: 100, y: 300, type: "merchant", totalAmount: 89 },
  { id: "n7", name: "James O.", x: 700, y: 300, type: "user", totalAmount: 200 },
];

const EDGES: Edge[] = [
  { id: "e1", from: "n1", to: "n2", amount: 127, status: "confirmed" },
  { id: "e2", from: "n1", to: "n3", amount: 45, status: "confirmed" },
  { id: "e3", from: "n1", to: "n4", amount: 850, status: "pending" },
  { id: "e4", from: "n1", to: "n5", amount: 120, status: "confirmed" },
  { id: "e5", from: "n1", to: "n6", amount: 89, status: "confirmed" },
  { id: "e6", from: "n1", to: "n7", amount: 200, status: "flagged" },
];

export default function TransactionGraph() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [search, setSearch] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);

  const getNodeColor = (type: string) => {
    switch (type) {
      case "user":
        return "#00C8FF";
      case "merchant":
        return "#8040FF";
      case "exchange":
        return "#FFB800";
      default:
        return "#FFFFFF";
    }
  };

  const getEdgeColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "#00C851";
      case "pending":
        return "#FFB800";
      case "flagged":
        return "#FF3B5C";
      default:
        return "#FFFFFF";
    }
  };

  const filteredNodes = search
    ? NODES.filter((n) => n.name.toLowerCase().includes(search.toLowerCase()))
    : NODES;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      className="p-6 rounded-[20px] backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(0,200,255,0.12)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,255,0.12)" }}>
            <svg className="w-4 h-4 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Transaction Graph</h2>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#00C8FF]/50"
          />
        </div>
      </div>

      {/* Graph Container */}
      <div
        className="relative rounded-xl overflow-hidden mb-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          height: "500px",
        }}
      >
        {/* Zoom Controls */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20"
          >
            −
          </button>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 text-xs"
          >
            ↺
          </button>
        </div>

        {/* SVG Graph */}
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 800 600"
          style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)` }}
        >
          {/* Edges */}
          {EDGES.map((edge) => {
            const fromNode = NODES.find((n) => n.id === edge.from)!;
            const toNode = NODES.find((n) => n.id === edge.to)!;
            return (
              <g key={edge.id}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={getEdgeColor(edge.status)}
                  strokeWidth={selectedEdge?.id === edge.id ? 4 : 2}
                  strokeOpacity={selectedEdge?.id === edge.id ? 1 : 0.4}
                  className="cursor-pointer"
                  onClick={() => setSelectedEdge(edge)}
                />
                {/* Amount Label */}
                <rect
                  x={(fromNode.x + toNode.x) / 2 - 20}
                  y={(fromNode.y + toNode.y) / 2 - 10}
                  width="40"
                  height="20"
                  rx="4"
                  fill="rgba(0,0,0,0.8)"
                  stroke={getEdgeColor(edge.status)}
                  strokeWidth="1"
                />
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  ${edge.amount}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {filteredNodes.map((node) => (
            <g
              key={node.id}
              className="cursor-pointer"
              onClick={() => setSelectedNode(node)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={selectedNode?.id === node.id ? 35 : 30}
                fill={`${getNodeColor(node.type)}20`}
                stroke={getNodeColor(node.type)}
                strokeWidth={selectedNode?.id === node.id ? 4 : 2}
              />
              <text
                x={node.x}
                y={node.y - 40}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {node.name}
              </text>
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="black"
              >
                ${node.totalAmount.toLocaleString()}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 p-3 rounded-lg bg-black/60 backdrop-blur-sm">
          <div className="text-[9px] text-white/40 mb-2">NODE TYPES</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00C8FF]" />
              <span className="text-[9px] text-white/60">User</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#8040FF]" />
              <span className="text-[9px] text-white/60">Merchant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FFB800]" />
              <span className="text-[9px] text-white/60">Exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Details */}
      {selectedNode && (
        <div
          className="p-4 rounded-xl mb-3"
          style={{
            background: "rgba(0,200,255,0.05)",
            border: "1px solid rgba(0,200,255,0.15)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">{selectedNode.name}</div>
              <div className="text-[11px] text-white/40 capitalize">{selectedNode.type}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-[#00C8FF]">${selectedNode.totalAmount.toLocaleString()}</div>
              <div className="text-[9px] text-white/40">Total Volume</div>
            </div>
          </div>
        </div>
      )}

      {selectedEdge && (
        <div
          className="p-4 rounded-xl"
          style={{
            background: "rgba(128,64,255,0.05)",
            border: `1px solid ${getEdgeColor(selectedEdge.status)}30`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">
                {NODES.find((n) => n.id === selectedEdge.from)?.name} → {NODES.find((n) => n.id === selectedEdge.to)?.name}
              </div>
              <div className="text-[11px] text-white/40 capitalize">{selectedEdge.status}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-[#8040FF]">${selectedEdge.amount}</div>
              <div className="text-[9px] text-white/40">Amount</div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl text-center" style={{ background: "rgba(0,200,81,0.05)", border: "1px solid rgba(0,200,81,0.15)" }}>
          <div className="text-lg font-black text-[#00C851]">{EDGES.filter((e) => e.status === "confirmed").length}</div>
          <div className="text-[9px] text-white/40">Confirmed</div>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.15)" }}>
          <div className="text-lg font-black text-[#FFB800]">{EDGES.filter((e) => e.status === "pending").length}</div>
          <div className="text-[9px] text-white/40">Pending</div>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ background: "rgba(255,59,92,0.05)", border: "1px solid rgba(255,59,92,0.15)" }}>
          <div className="text-lg font-black text-[#FF3B5C]">{EDGES.filter((e) => e.status === "flagged").length}</div>
          <div className="text-[9px] text-white/40">Flagged</div>
        </div>
      </div>
    </div>
  );
}
