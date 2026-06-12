"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables, ChartConfiguration, TooltipItem } from "chart.js";
import {
  TrendingUp, Eye, Clock, MousePointerClick,
  Search, Share2, Link2, Mail, ArrowUpRight,
} from "lucide-react";

Chart.register(...registerables);

// Interface maps matching structure definitions
interface MetricItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  change: string;
  sub: string;
}

interface MetricCardProps extends MetricItem {}

const metrics: MetricItem[] = [
  { label: "Total Page Views", value: "3,842", icon: Eye, change: "+8%", sub: "vs last month" },
  { label: "Avg. Time on Page", value: "2m 34s", icon: Clock, change: "+12s", sub: "vs last month" },
  { label: "Click-through Rate", value: "5.4%", icon: MousePointerClick, change: "+0.6%", sub: "vs last month" },
  { label: "Growth Rate", value: "18%", icon: TrendingUp, change: "+3%", sub: "vs last month" },
];

const trafficData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  thisMonth: [92, 108, 121, 145],
  lastMonth: [70, 88, 95, 120],
};

const deviceData = [
  { name: "Desktop", value: 54, color: "#378ADD" },
  { name: "Mobile", value: 38, color: "#7F77DD" },
  { name: "Tablet", value: 8, color: "#5a7fa0" },
];

const trafficSources = [
  { label: "Organic Search", value: 42, icon: Search, color: "#378ADD" },
  { label: "Social Media", value: 27, icon: Share2, color: "#7F77DD" },
  { label: "Direct", value: 19, icon: Link2, color: "#5aab2e" },
  { label: "Email", value: 12, icon: Mail, color: "#e07b3a" },
];

const topArticles = [
  { title: "Climate Change Update 2026", views: 1240, category: "Climate", trend: "+14%" },
  { title: "Food Security in East Africa", views: 980, category: "Food Security", trend: "+9%" },
  { title: "Live Coverage: Summit 2026", views: 870, category: "Live", trend: "+22%" },
  { title: "Global News Roundup", views: 752, category: "Global News", trend: "+5%" },
];

// Reusable hook with precise strict configuration boundaries
function useChart(
  ref: React.RefObject<HTMLCanvasElement | null>, 
  buildConfig: () => ChartConfiguration
) {
  useEffect(() => {
    if (!ref.current) return;
    const chart = new Chart(ref.current, buildConfig());
    return () => chart.destroy();
  }, [ref, buildConfig]);
}

function LineChart() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  
  useChart(ref, () => ({
    type: "line",
    data: {
      labels: trafficData.labels,
      datasets: [
        {
          label: "This month",
          data: trafficData.thisMonth,
          borderColor: "#378ADD",
          backgroundColor: "rgba(55,138,221,0.10)",
          borderWidth: 2.5,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#378ADD",
          pointBorderColor: "#0a1622",
          pointBorderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Last month",
          data: trafficData.lastMonth,
          borderColor: "#334d66",
          backgroundColor: "transparent",
          borderWidth: 2,
          borderDash: [5, 4],
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: "#334d66",
          pointBorderColor: "#0a1622",
          pointBorderWidth: 2,
          fill: false,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0d1e2e",
          borderColor: "#1e3a5f",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 10,
          titleColor: "#c8ddf0",
          bodyColor: "#8ba8c4",
          titleFont: { size: 12, weight: 500 },
          bodyFont: { size: 12 },
        },
      },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: { color: "#4d7a9e", font: { size: 11 } },
          border: { display: false },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: { color: "#4d7a9e", font: { size: 11 }, padding: 8 },
          border: { display: false },
        },
      },
    },
  }));
  
  return <canvas ref={ref} />;
}

function DonutChart() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  
  useChart(ref, () => ({
    type: "doughnut",
    data: {
      labels: deviceData.map((d) => d.name),
      datasets: [
        {
          data: deviceData.map((d) => d.value),
          backgroundColor: deviceData.map((d) => d.color),
          borderWidth: 3,
          borderColor: "#0a1622",
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "72%",
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0d1e2e",
          borderColor: "#1e3a5f",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 10,
          titleColor: "#c8ddf0",
          bodyColor: "#8ba8c4",
          callbacks: { 
            label: (ctx: TooltipItem<"doughnut">) => `  ${ctx.label}: ${ctx.parsed}%` 
          },
        },
      },
    },
  }));
  
  return <canvas ref={ref} />;
}

function MetricCard({ label, value, icon: Icon, change, sub }: MetricCardProps) {
  return (
    <div className="bg-[#0d1e2e] border border-[#1a3350] rounded-2xl p-5 flex flex-col gap-4 hover:border-[#2a5580] transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <span className="text-[#4d7a9e] text-xs font-medium tracking-wide uppercase">{label}</span>
        <div className="bg-[#112236] border border-[#1a3350] rounded-xl p-2 group-hover:border-[#2a5580] transition-colors">
          <Icon size={14} className="text-[#378ADD]" strokeWidth={2} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-semibold text-white tracking-tight leading-none">{value}</p>
      </div>
      <div className="flex items-center gap-2 pt-1 border-t border-[#1a3350]">
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
          <ArrowUpRight size={12} /> {change}
        </span>
        <span className="text-[#4d7a9e] text-xs">{sub}</span>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const maxViews = Math.max(...topArticles.map((a) => a.views));

  return (
    <div className="min-h-screen bg-[#070f18] text-[#c8ddf0]">
      <div className="max-w-7xl mx-auto p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Analytics</h1>
            <p className="text-[#4d7a9e] text-sm mt-1">Performance overview · last 30 days</p>
          </div>
          <div className="flex items-center gap-2 bg-[#0d1e2e] border border-[#1a3350] rounded-xl px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-[#8ba8c4] font-medium">Live data</span>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {metrics.map((m) => <MetricCard key={m.label} {...m} />)}
        </div>

        {/* Line chart */}
        <div className="bg-[#0d1e2e] border border-[#1a3350] rounded-2xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-white font-semibold text-base">Page Views Over Time</h2>
              <p className="text-[#4d7a9e] text-xs mt-1">Weekly comparison · this vs last month</p>
            </div>
            <div className="flex gap-5 text-xs text-[#4d7a9e]">
              <span className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#378ADD] rounded" /> This month
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-6 h-0.5 rounded"
                  style={{ borderTop: "2px dashed #334d66", background: "none" }}
                /> Last month
              </span>
            </div>
          </div>
          <div className="relative w-full h-[240px]">
            <LineChart />
          </div>
        </div>

        {/* Donut + Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Device breakdown */}
          <div className="bg-[#0d1e2e] border border-[#1a3350] rounded-2xl p-6">
            <div className="mb-4">
              <h2 className="text-white font-semibold text-base">Traffic by Device</h2>
              <p className="text-[#4d7a9e] text-xs mt-1">Share of sessions per device type</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative w-[140px] h-[140px] flex-shrink-0">
                <DonutChart />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-semibold text-white">54%</span>
                  <span className="text-[10px] text-[#4d7a9e]">Desktop</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {deviceData.map((d) => (
                  <div key={d.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="flex items-center gap-2 text-xs text-[#8ba8c4]">
                        <span
                          className="w-2 h-2 rounded-sm flex-shrink-0"
                          style={{ backgroundColor: d.color }}
                        />
                        {d.name}
                      </span>
                      <span className="text-xs font-semibold text-white tabular-nums">{d.value}%</span>
                    </div>
                    <div className="w-full bg-[#112236] rounded-full h-1">
                      <div
                        className="h-1 rounded-full"
                        style={{ width: `${d.value}%`, backgroundColor: d.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Traffic sources */}
          <div className="bg-[#0d1e2e] border border-[#1a3350] rounded-2xl p-6">
            <div className="mb-5">
              <h2 className="text-white font-semibold text-base">Top Traffic Sources</h2>
              <p className="text-[#4d7a9e] text-xs mt-1">Where your readers come from</p>
            </div>
            <div className="space-y-5">
              {trafficSources.map(({ label, value, icon: Icon, color }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2.5 text-sm text-[#c8ddf0]">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${color}18` }}
                      >
                        <Icon size={13} style={{ color }} strokeWidth={2} />
                      </span>
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-white tabular-nums">{value}%</span>
                  </div>
                  <div className="w-full bg-[#112236] rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${value}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top articles */}
        <div className="bg-[#0d1e2e] border border-[#1a3350] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-semibold text-base">Top Articles by Views</h2>
              <p className="text-[#4d7a9e] text-xs mt-1">Best performing content · last 30 days</p>
            </div>
            <span className="text-xs bg-[#112236] border border-[#1a3350] text-[#4d7a9e] px-3 py-1.5 rounded-lg">
              4 articles
            </span>
          </div>

          <div className="grid grid-cols-4 text-[10px] uppercase tracking-widest text-[#4d7a9e] pb-3 border-b border-[#1a3350] font-medium px-1">
            <span className="col-span-2">Article</span>
            <span className="text-center">Category</span>
            <span className="text-right">Views</span>
          </div>

          <ul className="divide-y divide-[#111f30]">
            {topArticles.map((article, i) => (
              <li
                key={article.title}
                className="grid grid-cols-4 items-center py-4 px-1 hover:bg-[#0a1622] rounded-xl transition-colors group"
              >
                <div className="col-span-2 flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#1a3350] tabular-nums w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#c8ddf0] group-hover:text-white transition-colors leading-tight">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex-1 bg-[#112236] rounded-full h-1 w-24 overflow-hidden">
                        <div
                          className="bg-[#5aab2e] h-1 rounded-full"
                          style={{ width: `${(article.views / maxViews) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <span className="text-[10px] uppercase tracking-wide bg-[#112236] border border-[#1a3350] text-[#8ba8c4] px-2.5 py-1 rounded-lg font-medium">
                    {article.category}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-white tabular-nums">
                    {article.views.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400">{article.trend}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}