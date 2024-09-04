import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon, PlusIcon, TrashIcon, RefreshCwIcon, LayersIcon, GridIcon, ActivityIcon, SettingsIcon, ArrowLeftIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Toaster, toast } from 'react-hot-toast';

const BhujangaTool = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [cases, setCases] = useState([
    { id: '01', name: 'Case 01', status: 'Created' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Honeycomb states
  const [availableHoneypots, setAvailableHoneypots] = useState([
    { id: 'hp01', name: 'Honeypot 01', status: 'Active', onionAddress: 'xyz123.onion' },
    // Add more honeypots as needed
  ]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedHoneypot, setDeployedHoneypot] = useState(null);

  useEffect(() => {
    if (resolvedTheme) {
      setTheme(resolvedTheme);
    }
  }, [resolvedTheme, setTheme]);

  // Force logout on refresh
  useEffect(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      toast.success("Logged in successfully. Welcome to Bhujanga!");
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setCurrentPage('home');
    toast.success("Logged out successfully.");
  };

  const handleCreateCase = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newCase = { id: `0${cases.length + 1}`, name: `Case 0${cases.length + 1}`, status: 'Created' };
      setCases([...cases, newCase]);
      setCurrentPage('case');
      toast.success(`New case created: ${newCase.name}`);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteCase = (id) => {
    setCases(cases.filter(c => c.id !== id));
    toast.success(`Case ${id} has been deleted`);
  };

  const handleRestartCase = (id) => {
    setCases(cases.map(c => c.id === id ? {...c, status: 'Restarted'} : c));
    toast.success(`Case ${id} has been restarted`);
  };

  const [onionSite, setOnionSite] = useState('');
  const [isPeeling, setIsPeeling] = useState(false);
  const [scrapedData, setScrapedData] = useState(null);

  const handleOnionPeelerSubmit = (e) => {
    e.preventDefault();
    setIsPeeling(true);

    setTimeout(() => {
      setScrapedData('This is the scraped data from the .onion site');
      setIsPeeling(false);
    }, 3000);
  };

  const handleSaveData = () => {
    // Implement actual data saving logic here
    toast.success('Data saved successfully! (This is a placeholder message.)');
  };

  const handleDeployHoneypot = () => {
    setIsDeploying(true);
    setTimeout(() => {
      const newHoneypot = { id: `hp0${availableHoneypots.length + 1}`, name: `Honeypot 0${availableHoneypots.length + 1}`, status: 'Active', onionAddress: `abc456.onion` };
      setAvailableHoneypots([...availableHoneypots, newHoneypot]);
      setDeployedHoneypot(newHoneypot);
      setIsDeploying(false);
      toast.success(`Honeypot deployed: ${newHoneypot.name}`);
    }, 2000); // Simulate deployment delay
  };

  const handleSpectateHoneypot = (honeypot) => {
    // Implement logic to spectate the honeypot (e.g., open a new window/tab with the onion address)
    console.log(`Spectating honeypot: ${honeypot.name} (${honeypot.onionAddress})`);
    toast.info(`Spectating functionality is under development. Onion Address: ${honeypot.onionAddress}`);
  };


  const renderLoginPage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <div className="flex justify-center mb-6">
        <img
          src="https://avatars.githubusercontent.com/u/180052931?s=200&v=4"
          alt="Bhujanga Logo"
          className="w-20 h-20 rounded-full"
        />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Login to Bhujanga</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
        />
        <input
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </motion.button>
      </form>
    </motion.div>
  );

  const renderOnionPeelerPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Onion Peeler</h1>
      <form onSubmit={handleOnionPeelerSubmit} className="space-y-4">
        <input
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          type="text"
          placeholder="Enter .onion site URL"
          value={onionSite}
          onChange={(e) => setOnionSite(e.target.value)}
          aria-label="Onion Site URL"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isPeeling}
        >
          Start Peeling
        </button>
      </form>

      {isPeeling && (
        <div className="space-y-4">
          <img src="https://oniongames.jp/onion_wp/wp-content/uploads/2014/01/onionblog0129.gif" alt="Loading" className="mx-auto w-32" />
          <p className="text-center text-gray-800 dark:text-white">Peeling Information - Please Wait...</p>
        </div>
      )}

      {scrapedData && (
        <div className="space-y-4">
          <p className="text-gray-800 dark:text-white">Scraped Data:</p>
          <pre className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md">{scrapedData}</pre>
          <button
            onClick={handleSaveData}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Save Data
          </button>
        </div>
      )}
    </motion.div>
  );

  const renderHomePage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Bhujanga Dashboard</h1>
      
      </div>

      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCreateCase}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
        disabled={isLoading}
      >
        <PlusIcon className="w-5 h-5 mr-2" /> Create New Case
      </motion.button>
      <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Case History</h2>
      <AnimatePresence>
        {cases.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{c.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">Status: {c.status}</p>
            <div className="mt-4 flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRestartCase(c.id)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 flex items-center"
              >
                <RefreshCwIcon className="w-4 h-4 mr-1" aria-label="Restart Case" />
                Restart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDeleteCase(c.id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center"
              >
                <TrashIcon className="w-4 h-4 mr-1" aria-label="Delete Case" />
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );

  const renderCasePage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">New Case</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: 'Onion Peeler', icon: LayersIcon, color: 'blue', path: '/peel' },
          { title: 'HoneyComb', icon: GridIcon, color: 'green', path: '/comb' },
          { title: 'Analysis Engine', icon: ActivityIcon, color: 'yellow', path: '/analysis' },
          { title: 'Operational', icon: SettingsIcon, color: 'purple', path: '/ops' },
        ].map((item) => (
          <motion.button
            key={item.path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(item.path)}
            className={`bg-${item.color}-500 text-white p-6 rounded-lg hover:bg-${item.color}-600 focus:outline-none focus:ring-2 focus:ring-${item.color}-500 focus:ring-offset-2 flex flex-col items-center justify-center shadow-lg transform transition duration-300 ease-in-out`}
          >
            <item.icon className="w-16 h-16 mb-2" aria-label={item.title} />
            <span className="text-lg font-semibold">{item.title}</span>
          </motion.button>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentPage('home')}
        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Back to Dashboard
      </motion.button>
    </motion.div>
  );

  const renderOperationalPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Operational Guides</h1>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search Resources..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

     

   

      {/* How to Use Bhujanga */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">How to Use Bhujanga</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Bhujanga is designed to be intuitive and user-friendly. Here's a quick guide to get you started:
        </p>
        <ol className="list-decimal ml-6 text-gray-600 dark:text-gray-400">
          <li>Create a New Case: Start by creating a new case to organize your investigation.</li>
          <li>Utilize the Modules: Explore the different modules like Onion Peeler, HoneyComb, and Analysis Engine to gather and analyze data.</li>
          <li>Document Your Findings: Keep track of your progress and findings within each case.</li>
          <li>Collaborate (Optional): If working in a team, use the collaboration features to share information and insights.</li>
        </ol>
      </div>

      {/* How to Perform Correlation */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">How to Perform Correlation</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Correlation analysis helps you identify relationships between different data points. In Bhujanga, you can perform correlation using the Analysis Engine module. Here's how:
        </p>
        <ol className="list-decimal ml-6 text-gray-600 dark:text-gray-400">
          <li>Select Data Points: Choose the data points you want to correlate.</li>
          <li>Run Correlation Analysis: Use the built-in correlation tools within the Analysis Engine.</li>
          <li>Interpret Results: Analyze the correlation coefficients and visualizations to understand the relationships between the data points.</li>
        </ol>
      </div>
    </motion.div>
  );

  const renderAnalysisEnginePage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analysis Engine</h1>

      {/* Dummy Charts and Graphs (Placeholders) */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Traffic Flow Over Time</h2>
        <p className="text-gray-600 dark:text-gray-400">(Placeholder for a chart visualizing traffic flow over time)</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Node Connections</h2>
        <p className="text-gray-600 dark:text-gray-400">(Placeholder for a graph visualizing node connections)</p>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Correlate Data
        </button>

        <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Traffic Flow Checker
        </button>
      </div>
    </motion.div>
  );


  const renderHoneycombPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Honeycomb</h1>

      {/* Available Honeypots */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Available Honeypots</h2>
        <ul>
          {availableHoneypots.map((honeypot) => (
            <li key={honeypot.id} className="py-2">
              <span className="font-medium">{honeypot.name}</span> - {honeypot.status} - <a href={`http://${honeypot.onionAddress}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{honeypot.onionAddress}</a>
              <button onClick={() => handleSpectateHoneypot(honeypot)} className="ml-2 bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Spectate</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Deploy Honeypot */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Deploy Honeypot</h2>
        <button
          onClick={handleDeployHoneypot}
          disabled={isDeploying}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {isDeploying ? 'Deploying...' : 'Deploy Honeypot'}
        </button>
        {isDeploying && (
          <div className="mt-2 text-gray-600 dark:text-gray-400">Buffering... This may take a few moments.</div>
        )}
        {deployedHoneypot && (
          <div className="mt-2 text-green-600 dark:text-green-400">
            Honeypot deployed! Onion Address: <a href={`http://${deployedHoneypot.onionAddress}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{deployedHoneypot.onionAddress}</a>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage();
      case 'case':
        return renderCasePage();
      case '/peel':
        return renderOnionPeelerPage();
      case '/comb':
        return renderHoneycombPage(); // Render Honeycomb page
      case '/analysis':
        return renderAnalysisEnginePage();
      case '/ops':
        return renderOperationalPage();
      default:
        return renderHomePage();
    }
  };

  // Logic for handling back button functionality
  const handleGoBack = () => {
    if (currentPage === '/peel' || currentPage === '/comb' || currentPage === '/analysis' || currentPage === '/ops') {
      setCurrentPage('case');
    } else if (currentPage === 'case') {
      setCurrentPage('home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 sm:p-10">
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 z-10 py-3 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <img
            src="https://avatars.githubusercontent.com/u/180052931?s=200&v=4"
            alt="Bhujanga Logo"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-lg font-bold text-gray-800 dark:text-white">Bhujanga</span>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn && (
              <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </motion.button>
          )}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-gray-800 dark:text-white p-2 rounded-full focus:outline-none"
          >
            {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Content with Padding for Top Bar */}
      <div className="pt-14">
        <AnimatePresence mode='wait'>
          {!isLoggedIn && renderLoginPage()}
          {isLoggedIn && (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Back Button */}
              {currentPage !== 'home' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGoBack} // Use the new handleGoBack function
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
                </motion.button>
              )}

              {renderCurrentPage()}
            </motion.div>
          )}
        </AnimatePresence>
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default BhujangaTool;
