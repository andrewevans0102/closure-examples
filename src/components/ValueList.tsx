import React from 'react';
import { ValueLocation } from '../types/message';

interface ValueListProps {
    values: ValueLocation[];
    tab: 'A' | 'B';
}

const ValueList: React.FC<ValueListProps> = ({ values, tab }) => {
    const sortedValues = values.sort((a, b) => a.value - b.value);
    const isTabA = tab === 'A';

    return (
        <div className="h-96 overflow-y-auto border border-gray-700 rounded-b-lg bg-gray-800">
            <div className="p-4 space-y-2">
                {sortedValues.map((item) => (
                    <div
                        key={item.value}
                        className={`p-3 rounded-lg shadow-sm ${
                            isTabA ? 'bg-purple-900/50' : 'bg-emerald-900/50'
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-100">
                                Value {item.value}
                            </span>
                        </div>
                    </div>
                ))}
                {values.length === 0 && (
                    <div className="text-center text-gray-400 py-4">
                        No values in this tab
                    </div>
                )}
            </div>
        </div>
    );
};

export default ValueList;
