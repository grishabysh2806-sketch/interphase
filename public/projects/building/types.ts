import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

export interface EstimateItem {
  item: string;
  cost: number;
  unit: string;
  quantity: number;
}

export interface EstimateResult {
  projectName: string;
  description: string;
  materials: EstimateItem[];
  laborCost: number;
  totalEstimatedCost: number;
  timelineDays: number;
  recommendations: string[];
}

export enum PageRoute {
  HOME = '/',
  ESTIMATOR = '/estimator'
}