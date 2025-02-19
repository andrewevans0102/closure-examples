import { MoveMessage, ValueLocation } from '../types/message';

export const createInitialValues = (): ValueLocation[] => {
    return Array.from({ length: 5 }, (_, index) => ({
        value: index + 1,
        tab: 'A',
    }));
};

export const createMockHub = () => {
    return {
        on: (eventName: string, callback: (data: MoveMessage) => void) => {
            // Simulate value movements every 2 seconds
            const interval = setInterval(() => {
                // Randomly select a value (1-5) and a target tab
                const value = Math.floor(Math.random() * 5) + 1;
                const targetTab = Math.random() > 0.5 ? 'A' : 'B';

                callback({
                    type: 'move',
                    value,
                    targetTab,
                    timestamp: Date.now(),
                });
            }, 2000);

            return () => clearInterval(interval);
        },
        start: () => Promise.resolve(),
        stop: () => Promise.resolve(),
    };
};
