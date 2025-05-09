import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';

function Login({ setUsername }) {
  useEffect(() => {
    window.onTelegramAuth = function (user) {
      console.log("✅ User logged in via Telegram:", user);
      localStorage.setItem('username', user.username);
      localStorage.setItem('tg_id', user.id);
      setUsername(user.username);
    };

    const existing = document.getElementById('tg-login-script');
    if (!existing) {
      const script = document.createElement('script');
      script.id = 'tg-login-script';
      script.src = 'https://telegram.org/js/telegram-widget.js?7';
      script.setAttribute('data-telegram-login', 'shapeappbot'); // <-- βάλε εδώ το bot σου χωρίς @
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-userpic', 'false');
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-on-auth', 'onTelegramAuth');
      script.async = true;
      document.getElementById('telegram-login')?.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <p className="text-sm text-gray-500 mb-4">Sign in with Telegram</p>
        <div id="telegram-login"></div>
      </div>
    </div>
  );
}

function Profile({ username, ideas }) {
  const userIdeas = ideas.filter((idea) => idea.author === username);
  const votesCast = ideas.reduce((acc, idea) => acc + (idea.voted ? 1 : 0), 0);
  const likesReceived = userIdeas.reduce((acc, idea) => acc + idea.votes, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 ml-12">👤 Profile</h2>
      <div className="space-y-2">
        <p><strong>Username:</strong> @{username}</p>
        <p><strong>Ideas proposed:</strong> {userIdeas.length}</p>
        <p><strong>Likes cast:</strong> {votesCast}</p>
        <p><strong>Likes received:</strong> {likesReceived}</p>
      </div>
    </div>
  );
}

function Wallet() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 ml-12">🎒 Wallet</h2>
      <div className="space-y-2">
        <p><strong>Balance (TON):</strong> 2.35 TON</p>
        <p><strong>Balance (Our Token):</strong> Coming soon</p>
        <h3 className="mt-4 font-semibold">Recent Activity</h3>
        <ul className="list-disc pl-5 text-sm">
          <li>+5 tokens from liking ideas</li>
          <li>-0.1 TON for proposing idea</li>
        </ul>
      </div>
    </div>
  );
}

function ExploreIdeas({ ideas, handleVote }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 ml-12">🔍 Explore Ideas</h2>
      <div className="space-y-3">
        {ideas.map((idea, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <p className="font-medium text-sm mb-1">{idea.title}</p>
              <span className="text-xs text-gray-500">👍 {idea.votes} Likes</span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => handleVote(index)}
                className="text-blue-600 text-sm font-medium"
              >
                👍 {idea.voted ? 'Unlike' : 'Like'}
              </button>
              <button className="text-gray-600 text-xs">💬 Join Chat</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Voting() {
  const dummyPolls = [
    'Should we add real-time notifications?',
    'Introduce light/dark mode?',
    'Create a mobile-first version of the app?',
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 ml-12">🗳️ Voting</h2>
      <div className="space-y-3">
        {dummyPolls.map((poll, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow">
            <p className="font-medium text-sm mb-2">{poll}</p>
            <div className="flex gap-4">
              <button className="text-green-600 font-medium">✅ Yes</button>
              <button className="text-red-600 font-medium">❌ No</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Governance() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 ml-12">📊 Governance</h2>
      <p>Governance features coming soon.</p>
    </div>
  );
}

function Settings() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 ml-12">⚙️ Settings</h2>
      <p>Settings and preferences will go here.</p>
    </div>
  );
}

function Home({ ideas, handleVote, handleAddIdea }) {
  const [newIdea, setNewIdea] = useState('');

  const submitIdea = () => {
    if (newIdea.trim()) {
      handleAddIdea(newIdea);
      setNewIdea('');
    }
  };

  const trendingIdeas = [...ideas]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      <div className="bg-blue-100 text-blue-900 p-6 text-center rounded-b-3xl">
        <h1 className="text-3xl font-bold leading-tight mb-2">Vote, build, earn!</h1>
        <p className="text-sm mb-4">It's that simple.</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-base flex items-center gap-2 mx-auto">
          <span>📥</span> START NOW
        </button>
      </div>
      <div className="p-4 space-y-3">
        <Link to="/explore">
          <button className="w-full bg-gray-100 py-3 px-4 rounded-xl text-left text-black font-medium text-sm flex justify-between items-center">
            🔍 Explore ideas
          </button>
        </Link>
        <div className="flex gap-2">
          <input
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
            placeholder="Your idea title..."
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={submitIdea}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ➕ Add Idea
          </button>
        </div>
        <button className="w-full bg-gray-100 py-3 px-4 rounded-xl text-left text-black font-medium text-sm flex justify-between items-center">
          🔥 Popular likes
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-3">Trending Ideas</h2>
        <div className="space-y-3">
          {trendingIdeas.map((idea, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <p className="font-medium text-sm mb-1">{idea.title}</p>
                <span className="text-xs text-gray-500">👍 {idea.votes} Likes</span>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => handleVote(ideas.indexOf(idea))}
                  className="text-blue-600 text-sm font-medium"
                >
                  👍 {idea.voted ? 'Unlike' : 'Like'}
                </button>
                <button className="text-gray-600 text-xs">💬 Join Chat</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [ideas, setIdeas] = useState(() => {
    const saved = localStorage.getItem('ideas');
    return saved ? JSON.parse(saved) : [
      { title: 'Modular chat rooms per idea', votes: 203, voted: false, author: 'system' },
      { title: 'Flag system for spam ideas', votes: 187, voted: false, author: 'system' },
      { title: 'Token-based proposal access', votes: 162, voted: false, author: 'system' },
      { title: 'User-generated voting roles', votes: 98, voted: false, author: 'system' },
      { title: 'Real-time governance sessions', votes: 142, voted: false, author: 'system' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }, [ideas]);

  if (!username) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login setUsername={setUsername} />} />
        </Routes>
      </Router>
    );
  }

  const handleVote = (index) => {
    const updatedIdeas = [...ideas];
    updatedIdeas[index].votes += updatedIdeas[index].voted ? -1 : 1;
    updatedIdeas[index].voted = !updatedIdeas[index].voted;
    setIdeas(updatedIdeas);
  };

  const handleAddIdea = (title) => {
    const newIdea = {
      title,
      votes: 0,
      voted: false,
      author: username,
    };
    setIdeas([newIdea, ...ideas]);
  };

  return (
    <Router>
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-4 left-4 z-50"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div
          className={`fixed top-0 left-0 w-2/3 h-full bg-white shadow p-4 z-40 transition-transform duration-300 transform ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 ml-12">☰ Menu</h2>
          <ul className="space-y-2 text-lg">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>👤 Profile</Link>
            </li>
            <li>
              <Link to="/wallet" onClick={() => setMenuOpen(false)}>🎒 Wallet</Link>
            </li>
            <li>
              <Link to="/explore" onClick={() => setMenuOpen(false)}>🔍 Explore</Link>
            </li>
            <li>
              <Link to="/voting" onClick={() => setMenuOpen(false)}>🗳️ Voting</Link>
            </li>
            <li>
              <Link to="/governance" onClick={() => setMenuOpen(false)}>📊 Governance</Link>
            </li>
            <li>
              <Link to="/settings" onClick={() => setMenuOpen(false)}>⚙️ Settings</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<Home ideas={ideas} handleVote={handleVote} handleAddIdea={handleAddIdea} />} />
          <Route path="/profile" element={<Profile username={username} ideas={ideas} />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/explore" element={<ExploreIdeas ideas={ideas} handleVote={handleVote} />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
