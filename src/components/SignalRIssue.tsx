import React, { useState, useEffect } from 'react';
import { ValueLocation, MoveMessage } from '../types/message';
import { createMockHub, createInitialValues } from '../utils/mockHub';
import ValueList from './ValueList';
import MessageDisplay from './MessageDisplay';

const SignalRIssue: React.FC = () => {
    const [tabAValues, setTabAValues] = useState<ValueLocation[]>(() =>
        createInitialValues()
    );
    const [tabBValues, setTabBValues] = useState<ValueLocation[]>([]);
    const [activeTab, setActiveTab] = useState<'A' | 'B'>('A');
    const [lastMove, setLastMove] = useState<MoveMessage | null>(null);

    useEffect(() => {
        const hub = createMockHub();

        hub.on('message', (data: MoveMessage) => {
            // The closure captures these initial arrays and will always reference
            // their initial values throughout the component's lifecycle
            if (data.targetTab === 'A') {
                // Remove from B (but using stale B state)
                setTabBValues(tabBValues.filter((v) => v.value !== data.value));
                // Add to A (but using stale A state)
                setTabAValues([
                    ...tabAValues,
                    {
                        tab: 'A',
                        value: data.value,
                    },
                ]);
            } else {
                // Remove from A (but using stale A state)
                setTabAValues(tabAValues.filter((v) => v.value !== data.value));
                // Add to B (but using stale B state)
                setTabBValues([
                    ...tabBValues,
                    {
                        tab: 'B',
                        value: data.value,
                    },
                ]);
            }

            setLastMove(data);
        });

        hub.start();

        return () => {
            hub.stop();
        };
    }, []); // Empty dependency array creates the closure issue

    return (
        <div className="p-4 bg-black rounded shadow">
            <h2 className="text-xl font-bold mb-4">SignalR Issue</h2>
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

                    <div className="mt-4 p-4 bg-yellow-900 rounded-lg border border-yellow-700">
                        <h3 className="text-sm font-medium text-yellow-300">
                            Issue Explained
                        </h3>
                        <p className="mt-2 text-sm text-yellow-200">
                            This component demonstrates the closure issue where
                            the event handler captures the initial state values
                            and doesn't see updates. Watch as values may
                            duplicate or disappear due to stale state
                            references.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignalRIssue;
