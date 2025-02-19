import { useState } from 'react';

const SetTimeoutIssue = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);

        // This will always show the value of count at the time the timeout was set
        setTimeout(() => {
            console.log('Current count (Issue):', count);
            alert(`Current count (Issue): ${count}`);
        }, 2000);
    };

    return (
        <div className="p-4 bg-black rounded shadow">
            <h2 className="text-xl font-bold mb-4">setTimeout Issue</h2>
            <p className="mb-4">Current count: {count}</p>
            <button
                onClick={handleClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Increment and Check After 2s
            </button>
            <div className="mt-4 p-4 bg-gray-100 rounded">
                <p className="text-black">
                    Expected: Alert shows the updated count
                </p>
                <p className="text-black">
                    Actual: Alert shows the count from when setTimeout was
                    called
                </p>
            </div>
        </div>
    );
};

export default SetTimeoutIssue;
