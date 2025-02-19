import React, { useState, useEffect, useRef } from 'react';
import { ValueLocation, MoveMessage } from '../types/message';
import { createMockHub, createInitialValues } from '../utils/mockHub';
import ValueList from './ValueList';
import MessageDisplay from './MessageDisplay';

const SignalRSolution: React.FC = () => {
    const [tabAValues, setTabAValues] = useState<ValueLocation[]>(() =>
        createInitialValues()
    );
    const [tabBValues, setTabBValues] = useState<ValueLocation[]>([]);
    const [activeTab, setActiveTab] = useState<'A' | 'B'>('A');
    const [lastMove, setLastMove] = useState<MoveMessage | null>(null);

    // Create refs to maintain latest state values
    const tabAValuesRef = useRef(tabAValues);
    const tabBValuesRef = useRef(tabBValues);

    // Keep refs in sync with current state
    tabAValuesRef.current = tabAValues;
    tabBValuesRef.current = tabBValues;

    useEffect(() => {
        const hub = createMockHub();

        hub.on('message', (data: MoveMessage) => {
            // Use refs to access current state values
            const valueInA = tabAValuesRef.current.find(
                (v) => v.value === data.value
            );

            if (data.targetTab === 'A') {
                if (!valueInA) {
                    // Value should move to A
                    const valueInB = tabBValuesRef.current.find(
                        (v) => v.value === data.value
                    );
                    if (valueInB) {
                        // Use functional updates to ensure clean state transitions
                        setTabBValues((prev) =>
                            prev.filter((v) => v.value !== data.value)
                        );
                        setTabAValues((prev) => [
                            ...prev,
                            {
                                tab: 'A',
                                value: data.value,
                            },
                        ]);
                    }
                }
            } else {
                if (valueInA) {
                    // Value should move to B
                    setTabAValues((prev) =>
                        prev.filter((v) => v.value !== data.value)
                    );
                    setTabBValues((prev) => [
                        ...prev,
                        {
                            tab: 'B',
                            value: data.value,
                        },
                    ]);
                }
            }

            setLastMove(data);
        });

        hub.start();

        return () => {
            hub.stop();
        };
    }, []); // Empty dependency array is fine now because we're using refs

    return (
        <div className="p-4 bg-black rounded shadow">
            <h2 className="text-xl font-bold mb-4">SignalR Solution</h2>
            <div className="min-h-screen w-full flex items-center justify-center py-8">
                <div className="max-w-2xl w-full mx-4">
                    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                        <MessageDisplay message={lastMove} />

                        <div className="border-b border-gray-700">
                            <div className="flex">
                                <button
                                    onClick={() => setActiveTab('A')}
                                    className={`px-6 py-3 text-sm font-medium flex-1 ${
                                        activeTab === 'A'
                                            ? 'border-b-2 border-purple-500 text-purple-400 bg-purple-900/20'
                                            : 'text-gray-400 hover:text-purple-300 hover:bg-purple-900/10'
                                    }`}
                                >
                                    Tab A ({tabAValues.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('B')}
                                    className={`px-6 py-3 text-sm font-medium flex-1 ${
                                        activeTab === 'B'
                                            ? 'border-b-2 border-emerald-500 text-emerald-400 bg-emerald-900/20'
                                            : 'text-gray-400 hover:text-emerald-300 hover:bg-emerald-900/10'
                                    }`}
                                >
                                    Tab B ({tabBValues.length})
                                </button>
                            </div>
                        </div>

                        {activeTab === 'A' ? (
                            <ValueList values={tabAValues} tab={activeTab} />
                        ) : (
                            <ValueList values={tabBValues} tab={activeTab} />
                        )}
                    </div>

                    <div className="mt-4 p-4 bg-green-900 rounded-lg border border-green-700">
                        <h3 className="text-sm font-medium text-green-300">
                            Solution Explained
                        </h3>
                        <p className="mt-2 text-sm text-green-200">
                            This version uses useRef to maintain references to
                            the latest state values, combined with functional
                            updates to ensure proper state transitions. Values
                            will move correctly between tabs without duplication
                            or loss.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignalRSolution;
