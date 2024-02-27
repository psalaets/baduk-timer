export const BYOYOMI: 'byoyomi' = 'byoyomi';
export const CANADIAN: 'canadian' = 'canadian';
export const FISCHER: 'fischer' = 'fischer';

export type Byoyomi = typeof BYOYOMI;
export type Canadian = typeof CANADIAN;
export type Fischer = typeof FISCHER;

export type ClockType = Byoyomi | Canadian | Fischer;
