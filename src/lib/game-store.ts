import { writable } from 'svelte/store';
import { type Game } from './game';

export const gameStore = writable<Game>();
