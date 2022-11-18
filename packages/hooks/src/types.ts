/// <reference types="vitest" />
/// <reference types="vite/client" />
import { EventHandler } from 'react';

export type Fn = (...args: any[]) => any;

export type EventHandlers = Record<string, EventHandler<any>>;
export {};
