import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SetTimeoutIssue from './components/SetTimeoutIssue';
import SetTimeoutSolution from './components/SetTimeoutSolution';
import SignalRIssue from './components/SignalRIssue';
import SignalRSolution from './components/SignalRSolution';
import HomePage from './components/HomePage';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white shadow-lg p-4">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                to="/timeout-issue"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                setTimeout Issue
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/timeout-solution"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                setTimeout Solution
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signalr-issue"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                SignalR Issue
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signalr-solution"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                SignalR Solution
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/timeout-issue"
                            element={<SetTimeoutIssue />}
                        />
                        <Route
                            path="/timeout-solution"
                            element={<SetTimeoutSolution />}
                        />
                        <Route
                            path="/signalr-issue"
                            element={<SignalRIssue />}
                        />
                        <Route
                            path="/signalr-solution"
                            element={<SignalRSolution />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
