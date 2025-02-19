export interface ValueLocation {
    value: number; // 1-5
    tab: 'A' | 'B';
}

export interface MoveMessage {
    type: 'move';
    value: number; // Which value (1-5) to move
    targetTab: 'A' | 'B'; // Where to move it
    timestamp: number;
}
