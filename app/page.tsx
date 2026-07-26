'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Cpu, 
  Settings, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ListTodo,
  FolderGit2,
  X,
  User,
  LogOut,
  LogIn
} from 'lucide-react';

const VaultFlowLogo = ({ className = "" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center w-full h-full ${className}`}>
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full animate-pulse pointer-events-none"
      style={{ animationDuration: '4s' }}
    >
      <circle 
        cx="50" cy="50" r="46" 
        stroke="url(#paint0_linear)" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeDasharray="6 6"
      />
      <path 
        d="M15 35 L15 15 L35 15" 
        stroke="url(#paint0_linear)" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      <circle cx="15" cy="15" r="3" fill="#22d3ee" />
      <path 
        d="M85 65 L85 85 L65 85" 
        stroke="url(#paint1_linear)" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      <circle cx="85" cy="85" r="3" fill="#e879f9" />
      <defs>
        <linearGradient id="paint0_linear" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c084fc" stopOpacity="0" />
          <stop offset="1" stopColor="#e879f9" />
        </linearGradient>
      </defs>
    </svg>

    <span className="font-black text-cyan-400 text-xl tracking-tighter select-none z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
      VF
    </span>
  </div>
);

export default function VaultFlowApp() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Persistent State for Settings
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Hussain Jahanzaib');
  const [userEmail, setUserEmail] = useState('hussain@vaultflow.ai');

  // Persistent State for Automation Hub Checkboxes
  const [aiTaskRouting, setAiTaskRouting] = useState(true);
  const [morningBriefing, setMorningBriefing] = useState(true);
  const [githubSyncer, setGithubSyncer] = useState(true);
  const [slackNotifier, setSlackNotifier] = useState(false);

  // Persistent State for Vaults Management
  const [vaults, setVaults] = useState([
    { id: 1, name: 'Primary Secure Vault', type: 'Production Cluster', status: 'Active & Secured', records: '1.2M' },
    { id: 2, name: 'Analytics Cold Vault', type: 'Historical Archive', status: 'Synced', records: '4.8M' }
  ]);
  const [newVaultName, setNewVaultName] = useState('');
  const [newVaultType, setNewVaultType] = useState('Production Cluster');

  // AI Chat State
  const [aiQuery, setAiQuery] = useState('');
  const [aiChat, setAiChat] = useState([
    { sender: 'ai', text: 'Hello Hussain! I am your VaultFlow AI co-pilot. Your systems are fully operational. How can I assist your data pipelines today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // LocalStorage Sync for APK/Web Persistence
  useEffect(() => {
    const savedName = localStorage.getItem('vf_username');
    if (savedName) setUserName(savedName);
  }, []);

  useEffect(() => {
    localStorage.setItem('vf_username', userName);
  }, [userName]);

  const handleCreateVault = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVaultName.trim()) return;
    const newVault = {
      id: vaults.length + 1,
      name: newVaultName,
      type: newVaultType,
      status: 'Active & Secured',
      records: '0'
    };
    setVaults([...vaults, newVault]);
    setNewVaultName('');
  };

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim() || isLoading) return;
    
    const userMsg = aiQuery;
    setAiChat(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiQuery('');
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMsg }] }]
        })
      });

      const data = await response.json();
      const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated from pipeline.';

      setAiChat(prev => [...prev, { sender: 'ai', text: aiReply }]);
    } catch (err) {
      setAiChat(prev => [...prev, { sender: 'ai', text: 'Error connecting to Gemini pipeline. Please check your network connection.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {showWelcome && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0e14] border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowWelcome(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 shrink-0">
                <VaultFlowLogo />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Welcome to VaultFlow</h2>
                <span className="text-xs bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent font-mono uppercase tracking-widest font-semibold">Enterprise Workspace</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Your centralized intelligence workspace is initialized and ready.
            </p>

            <div className="space-y-2 mb-6 text-xs bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <p className="font-bold text-cyan-400 mb-2 uppercase tracking-wider font-mono">Core Principles:</p>
              <p>• <strong>Security First & Zero Trust:</strong> Uncompromising encryption and continuous monitoring to safeguard every data pipeline.</p>
              <p>• <strong>Autonomous Intelligence:</strong> Embedded AI co-pilots that proactively streamline workflows and automate task routing.</p>
              <p>• <strong>Modular Scalability:</strong> High-performance, flexible architecture designed to seamlessly grow alongside your enterprise demands.</p>
              <p>• <strong>Unified Control:</strong> Centralized intelligence workspace merging team management, data vaults, and system controls into one interface.</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setShowWelcome(false)}
                className="w-full bg-gradient-to-r from-cyan-400 to-indigo-500 hover:opacity-90 text-slate-950 font-bold py-3 rounded-xl text-sm transition cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Enter Workspace
              </button>
              
              <div className="text-center pt-2 border-t border-slate-800/80">
                <p className="text-[11px] text-slate-500 font-mono">
                  © 2026 VaultFlow Inc. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <aside className="w-64 bg-[#0b0e14] border-r border-slate-800/60 flex flex-col justify-between p-4 shadow-2xl">
        <div>
          <div className="flex items-center gap-3 px-2 mb-8 mt-2 select-none">
            <div className="w-12 h-12 shrink-0">
              <VaultFlowLogo />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Vault<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">Flow</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest font-semibold">
                Enterprise v2.5
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer ${activeTab === 'dashboard' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('vaults')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer ${activeTab === 'vaults' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'}`}
            >
              <Database size={18} /> Vaults
            </button>
            <button 
              onClick={() => setActiveTab('pipelines')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer ${activeTab === 'pipelines' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'}`}
            >
              <Cpu size={18} /> Automation Hub
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer ${activeTab === 'settings' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'}`}
            >
              <Settings size={18} /> Settings
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800/60">
          <div className="flex items-center gap-3 px-3 py-3 bg-[#07090e] rounded-2xl border border-slate-800/60 shadow-inner">
            <div className="w-10 h-10 shrink-0">
              <VaultFlowLogo />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">{userName}</h4>
              <p className="text-[11px] text-cyan-400 font-medium">{isLoggedIn ? 'Online (Testing)' : 'Logged Out'}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto bg-[#07090e] p-8">
        
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800/60">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white capitalize">{activeTab === 'pipelines' ? 'Automation Hub' : activeTab}</h1>
            <p className="text-xs text-slate-400 mt-0.5">Centralized intelligence workspace & AI assistant active.</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-medium border border-emerald-500/20 shadow-sm">
            <ShieldCheck size={14} /> Workspace Secure
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-[#0b0e14] border border-slate-800/80 p-5 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-2">
                <Sparkles size={14} /> AI Daily Briefing
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Good morning, {userName}. Your 3 key focuses today are:<br/>
                1. Finalize Q3 Vault Architecture.<br/>
                2. Review Design System & Neon Gradients.<br/>
                3. Team Pipeline Sync.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#0b0e14] border border-slate-800/80 p-5 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <ListTodo size={16} className="text-cyan-400" /> Daily Tasks
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded border-slate-700 accent-cyan-500" /> Email client pipeline update</li>
                  <li className="flex items-center gap-2"><input type="checkbox" className="rounded border-slate-700 accent-cyan-500" /> Prepare agenda sync</li>
                  <li className="flex items-center gap-2"><input type="checkbox" className="rounded border-slate-700 accent-cyan-500" /> Review vault security logs</li>
                </ul>
              </div>

              <div className="bg-[#0b0e14] border border-slate-800/80 p-5 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <FolderGit2 size={16} className="text-fuchsia-400" /> Projects
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="text-slate-300">Project Phoenix</span><span className="text-cyan-400 font-mono">85%</span></div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-[85%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="text-slate-300">Project Atlas</span><span className="text-fuchsia-400 font-mono">45%</span></div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 h-full w-[45%]"></div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0b0e14] border border-slate-800/80 rounded-2xl flex flex-col overflow-hidden h-[340px] shadow-xl">
              <div className="px-5 py-3 border-b border-slate-800/80 flex items-center gap-2 bg-[#0b0e14]">
                <Sparkles size={16} className="text-cyan-400" />
                <h2 className="text-sm font-semibold text-white">VaultFlow AI Co-Pilot</h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {aiChat.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-medium rounded-br-none' 
                        : 'bg-slate-900 text-slate-200 rounded-bl-none border border-slate-800'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900 text-slate-400 px-4 py-2.5 rounded-2xl rounded-bl-none text-sm animate-pulse border border-slate-800">
                      Analyzing workspace...
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleAiSubmit} className="p-3 border-t border-slate-800/80 bg-[#07090e] flex gap-3">
                <input 
                  type="text" 
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask VaultFlow anything..." 
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-cyan-400 to-indigo-500 hover:opacity-90 disabled:opacity-50 text-slate-950 px-4 py-2 rounded-xl font-bold text-sm transition flex items-center justify-center cursor-pointer shadow-md"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'vaults' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Managed Data Vaults</h2>
              <span className="text-xs text-slate-400 font-mono">Total Nodes: {vaults.length}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {vaults.map((vault) => (
                <div key={vault.id} className="bg-[#0b0e14] border border-slate-800 p-5 rounded-2xl shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-bold text-cyan-400">{vault.name}</h3>
                      <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20">{vault.type}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">Encrypted storage cluster handling enterprise streams.</p>
                  </div>
                  
                  <div className="space-y-3 pt-3 border-t border-slate-800/80">
                    <div className="flex justify-between text-xs font-mono text-slate-300">
                      <span>Indexed Records:</span>
                      <span className="text-fuchsia-400">{vault.records}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                        <ShieldCheck size={14} /> {vault.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0b0e14] border border-slate-800 p-6 rounded-2xl mt-6">
              <h3 className="text-sm font-bold text-white mb-3">Provision New Vault Node</h3>
              <form onSubmit={handleCreateVault} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Vault Name</label>
                  <input 
                    type="text" 
                    value={newVaultName}
                    onChange={(e) => setNewVaultName(e.target.value)}
                    placeholder="e.g., Global Customer Vault" 
                    className="w-full bg-[#07090e] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Vault Architecture Type</label>
                  <select 
                    value={newVaultType}
                    onChange={(e) => setNewVaultType(e.target.value)}
                    className="w-full bg-[#07090e] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Production Cluster">Production Cluster</option>
                    <option value="Historical Archive">Historical Archive</option>
                    <option value="Real-time Stream">Real-time Stream</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-cyan-400 to-indigo-500 hover:opacity-90 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md"
                >
                  Deploy & Secure Vault
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'pipelines' && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-lg font-semibold text-white">Automation Hub</h2>
            <div className="bg-[#0b0e14] border border-slate-800 p-6 rounded-2xl space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800/80">
                <div>
                  <h4 className="text-sm font-bold text-white">AI Task Routing</h4>
                  <p className="text-xs text-slate-400">Parse notes into structured tasks automatically.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={aiTaskRouting} 
                  onChange={(e) => setAiTaskRouting(e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 rounded cursor-pointer" 
                />
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-800/80">
                <div>
                  <h4 className="text-sm font-bold text-white">Daily Morning Briefing</h4>
                  <p className="text-xs text-slate-400">Receive summary digest at 8:00 AM daily.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={morningBriefing} 
                  onChange={(e) => setMorningBriefing(e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 rounded cursor-pointer" 
                />
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-800/80">
                <div>
                  <h4 className="text-sm font-bold text-white">GitHub Issue Syncer</h4>
                  <p className="text-xs text-slate-400">Create workspace tasks from assigned issues.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={githubSyncer} 
                  onChange={(e) => setGithubSyncer(e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 rounded cursor-pointer" 
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-white">Slack Notifier</h4>
                  <p className="text-xs text-slate-400">Push high priority tasks to channel feeds.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={slackNotifier} 
                  onChange={(e) => setSlackNotifier(e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 rounded cursor-pointer" 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-xl">
            <h2 className="text-lg font-semibold text-white">System Configuration & Login Settings</h2>
            
            <div className="bg-[#0b0e14] border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <User size={16} /> Test Account Management
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Project Owner Name</label>
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-[#07090e] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Test Email Address</label>
                <input 
                  type="email" 
                  value={userEmail} 
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-[#07090e] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono" 
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">Status: <strong className={isLoggedIn ? 'text-emerald-400' : 'text-amber-400'}>{isLoggedIn ? 'Active Test Session' : 'Signed Out'}</strong></span>
                <button 
                  onClick={() => setIsLoggedIn(!isLoggedIn)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${isLoggedIn ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20'}`}
                >
                  {isLoggedIn ? <><LogOut size={14} /> Simulate Logout</> : <><LogIn size={14} /> Simulate Login</>}
                </button>
              </div>
            </div>

            <div className="bg-[#0b0e14] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">API Connection Endpoint</label>
                <input type="text" readOnly value="Connected via Gemini Secure Gateway" className="w-full bg-[#07090e] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-cyan-400 font-mono" />
              </div>
            </div>
          </div>
        )}

        <footer className="mt-8 text-center py-4 border-t border-slate-900">
          <p className="text-xs text-slate-500">
            VaultFlow Enterprise • Architected & Built by <span className="text-cyan-400 font-semibold">{userName}</span> • © 2026 VaultFlow Inc. All rights reserved.
          </p>
        </footer>

      </main>
    </div>
  );
}