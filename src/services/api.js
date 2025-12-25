// src/services/api.js
import axios from "axios";

const API_BASE_URL = "https://user-anaytical-dashboard-api.onrender.com/";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Dashboard Overview
export const getDashboardOverview = (recentLimit = 10) =>
  api.get(`/dashboard/overview?recent_limit=${recentLimit}`);

// Analytics Summary
export const getAnalyticsSummary = () =>
  api.get("/analytics/summary");

// Analytics Trends
export const getAnalyticsTrends = (days = 14, page = 1, limit = 20) =>
  api.get(`/analytics/trends?days=${days}&page=${page}&limit=${limit}`);

// User Activity History
export const getUserActivity = (userId, page = 1, limit = 20) =>
  api.get(`/activity/user/${userId}?page=${page}&limit=${limit}`);

export const getMonthlyHeatmapSource = (days = 60) =>
  api.get(`/analytics/trends?days=${days}&page=1&limit=500`);


export default api;
