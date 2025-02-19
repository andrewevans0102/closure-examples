import { useState, useRef } from 'react';

const SetTimeoutSolution = () => {
    const [count, setCount] = useState(0);
    const countRef = useRef(count);

    // Keep the ref in sync with the state
    countRef.current = count;

    const handleClickWithRef = () => {
        setCount(count + 1);

        // Using ref to get the latest value
        setTimeout(() => {
            console.log('Current count (Solution with Ref):', countRef.current);
            alert(`Current count (Solution with Ref): ${countRef.current}`);
        }, 2000);
    };

    return (
        <div className="p-4 bg-black rounded shadow">
            <h2 className="text-xl font-bold mb-4">setTimeout Solution</h2>
            <p className="mb-4">Current count: {count}</p>
            <div className="space-y-4">
                <div>
                    <button
                        onClick={handleClickWithRef}
                        className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
                    >
                        Increment and Check After 2s
                    </button>
                    <div className="mt-4 p-4 bg-gray-100 rounded">
                        <p className="text-black">
                            Expected: Alert shows the updated count
                        </p>
                        <p className="text-black">
                            Actual: Alert shows the updated count
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetTimeoutSolution;
