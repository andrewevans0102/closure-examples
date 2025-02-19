import React from 'react';
import { MoveMessage } from '../types/message';

interface MessageDisplayProps {
    message: MoveMessage | null;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="p-4 bg-gray-900 border-b border-gray-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-300">Moving:</span>
                    <span className="font-bold text-white">
                        Value {message.value}
                    </span>
                    <span className="text-gray-300">to</span>
                    <span
                        className={`font-bold ${
                            message.targetTab === 'A'
                                ? 'text-purple-400'
                                : 'text-emerald-400'
                        }`}
                    >
                        Tab {message.targetTab}
                    </span>
                </div>
                <span className="text-sm text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString()}
                </span>
            </div>
        </div>
    );
};

export default MessageDisplay;
