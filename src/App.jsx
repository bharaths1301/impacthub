import { useMemo, useState } from "react";
import "./App.css";

const initialChallenges = [
  { id: 1, title: "Reduce Food Waste on Campus", category: "Environment", description: "Help college canteens reduce food waste through smarter tracking and donation.", people: 24, color: "green", status: "Open" },
  { id: 2, title: "Accessible Campus Map", category: "Accessibility", description: "Make it easier for students with mobility needs to navigate campus.", people: 18, color: "purple", status: "Open" },
  { id: 3, title: "Peer Learning Network", category: "Education", description: "Connect students who want to teach with students who want to learn.", people: 32, color: "blue", status: "In progress" },
  { id: 4, title: "Community Water Watch", category: "Community", description: "Build a simple way to report local water issues and track resolutions.", people: 15, color: "orange", status: "Open" },
];

const categories = ["All", "Environment", "Education", "Accessibility", "Community"];

function App() {
  const [challenges, setChallenges] = useState(initialChallenges);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [joined, setJoined] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Education");
  const [description, setDescription] = useState("");
  const [notice, setNotice] = useState("");

  const visibleChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      const matchesCategory =
        activeCategory === "All" || challenge.category === activeCategory;
      const query = search.toLowerCase().trim();
      const matchesSearch =
        challenge.title.toLowerCase().includes(query) ||
        challenge.description.toLowerCase().includes(query) ||
        challenge.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [challenges, activeCategory, search]);

  function joinChallenge(id) {
    if (joined.includes(id)) {
      setNotice("You're already part of this challenge.");
      return;
    }
    setJoined((previous) => [...previous, id]);
    setChallenges((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, people: item.people + 1 } : item
      )
    );
    setNotice("You've joined the challenge! Your first step starts now.");
  }

  function createChallenge(event) {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setChallenges((previous) => [
      {
        id: Date.now(),
        title: title.trim(),
        category,
        description: description.trim(),
        people: 1,
        color: "blue",
        status: "Open",
      },
      ...previous,
    ]);
    setTitle("");
    setDescription("");
    setCategory("Education");
    setShowForm(false);
    setActiveCategory("All");
    setSearch("");
    setNotice("Your new challenge has been created!");
  }

  const totalPeople = challenges.reduce((sum, item) => sum + item.people, 0);
  const activeProjects = challenges.filter(
    (item) => item.status === "In progress"
  ).length;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="ImpactHub home">
          <span className="brand-mark">✳</span>
          <span>impact<span className="brand-light">hub</span></span>
        </a>

        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav">
          <a className="nav-link active" href="#home"><span>▦</span> Overview</a>
          <a className="nav-link" href="#challenges"><span>◈</span> Explore challenges</a>
          <a className="nav-link" href="#my-work"><span>✓</span> My participation</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="mini-avatar">B</div>
          <div className="profile-copy">
            <strong>Student workspace</strong>
            <span>Community member</span>
          </div>
          <span className="profile-dots">•••</span>
        </div>
      </aside>

      <main className="main-content" id="home">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> Overview</div>
          <div className="topbar-right">
            <span className="live-dot"></span>
            <span className="live-label">Community workspace</span>
            <div className="top-avatar">B</div>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <div className="eyebrow"><span>✳</span> SMALL ACTIONS, REAL CHANGE</div>
            <h1>Ideas into <span>impact.</span></h1>
            <p className="welcome-copy">
              Discover challenges around you, find your people, and build
              solutions that make a difference.
            </p>
          </div>
          <button className="primary-button create-top" onClick={() => setShowForm(true)}>
            <span>＋</span> Create a challenge
          </button>
        </section>

        <section className="stats-grid" aria-label="Community statistics">
          <article className="stat-card">
            <div className="stat-top"><span>Discoverable challenges</span><span className="stat-icon lavender">◈</span></div>
            <div className="stat-number">{challenges.length.toString().padStart(2, "0")}</div>
            <div className="stat-foot"><span className="tiny-green">↗</span> Ideas ready for action</div>
          </article>
          <article className="stat-card">
            <div className="stat-top"><span>Community participants</span><span className="stat-icon mint">♧</span></div>
            <div className="stat-number">{totalPeople}</div>
            <div className="stat-foot">People working together</div>
          </article>
          <article className="stat-card">
            <div className="stat-top"><span>Projects in progress</span><span className="stat-icon peach">✳</span></div>
            <div className="stat-number">{activeProjects + joined.length}</div>
            <div className="stat-foot">Keep the momentum going</div>
          </article>
        </section>

        <section className="impact-banner">
          <div className="banner-symbol">✳</div>
          <div className="banner-copy">
            <strong>Every meaningful change starts somewhere.</strong>
            <span>Choose a challenge, contribute your skills, and make your campus better.</span>
          </div>
          <a href="#challenges" className="banner-link">Find your cause <span>↗</span></a>
        </section>

        <section className="challenge-section" id="challenges">
          <div className="section-heading">
            <div>
              <div className="eyebrow">THE COMMUNITY BOARD</div>
              <h2>Explore challenges <span className="count-pill">{visibleChallenges.length}</span></h2>
              <p>Real problems. Collaborative ideas. Measurable progress.</p>
            </div>
          </div>

          <div className="toolbar">
            <div className="search-box">
              <span>⌕</span>
              <input
                aria-label="Search challenges"
                placeholder="Search challenges or topics..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && <button className="clear-search" onClick={() => setSearch("")}>×</button>}
            </div>
            <button className="secondary-button" onClick={() => { setActiveCategory("All"); setSearch(""); }}>
              Reset filters
            </button>
          </div>

          <div className="category-list" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-chip ${activeCategory === item ? "selected" : ""}`}
                onClick={() => setActiveCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {notice && (
            <div className="notice" role="status">
              <span>✓</span> {notice}
              <button onClick={() => setNotice("")} aria-label="Dismiss message">×</button>
            </div>
          )}

          <div className="challenge-grid">
            {visibleChallenges.map((item) => (
              <article className="challenge-card" key={item.id}>
                <div className="card-topline">
                  <span className={`category-icon ${item.color}`}>✳</span>
                  <span className={`status-pill ${item.status === "Open" ? "status-open" : "status-progress"}`}>
                    <span></span>{item.status}
                  </span>
                </div>
                <span className="card-category">{item.category}</span>
                <h3>{item.title}</h3>
                <p className="card-description">{item.description}</p>
                <div className="card-footer">
                  <div className="participant-count"><span>♧</span> {item.people} participants</div>
                  <button
                    className={`join-button ${joined.includes(item.id) ? "joined" : ""}`}
                    onClick={() => joinChallenge(item.id)}
                  >
                    {joined.includes(item.id) ? "Joined ✓" : "Join challenge ↗"}
                  </button>
                </div>
              </article>
            ))}
          </div>

          {visibleChallenges.length === 0 && (
            <div className="empty-state">
              <span>⌕</span>
              <h3>No challenges found</h3>
              <p>Try another search or choose a different category.</p>
              <button className="secondary-button" onClick={() => { setActiveCategory("All"); setSearch(""); }}>Show all challenges</button>
            </div>
          )}
        </section>

        <section className="my-work-section" id="my-work">
          <div>
            <div className="eyebrow">YOUR CONTRIBUTION</div>
            <h2>My participation</h2>
            <p>You have joined <strong>{joined.length}</strong> challenge{joined.length === 1 ? "" : "s"} in this session.</p>
          </div>
          <div className="participation-meter">
            <div className="meter-track"><div style={{ width: `${Math.min(joined.length / Math.max(challenges.length, 1) * 100, 100)}%` }} /></div>
            <span>{joined.length} of {challenges.length} challenges joined</span>
          </div>
        </section>

        <footer className="footer">
          <span><span className="footer-mark">✳</span> impacthub</span>
          <span>Built for people who want to make a difference.</span>
        </footer>
      </main>

      {showForm && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowForm(false); }}>
          <section className="challenge-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-header">
              <div><div className="eyebrow">START SOMETHING GOOD</div><h2 id="modal-title">Create a challenge</h2></div>
              <button className="modal-close" onClick={() => setShowForm(false)} aria-label="Close form">×</button>
            </div>
            <p className="modal-description">Describe a problem you want your community to solve together.</p>
            <form onSubmit={createChallenge}>
              <label htmlFor="challenge-title">Challenge title</label>
              <input id="challenge-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Greener campus initiative" maxLength={80} required />
              <label htmlFor="challenge-category">Category</label>
              <select id="challenge-category" value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.filter((item) => item !== "All").map((item) => <option key={item}>{item}</option>)}
              </select>
              <label htmlFor="challenge-description">What's the problem?</label>
              <textarea id="challenge-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Explain the problem and how people might help..." rows={4} maxLength={350} required />
              <button className="primary-button modal-submit" type="submit">Publish challenge ↗</button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;