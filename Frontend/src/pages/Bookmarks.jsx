import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ProjectCard from '../components/ProjectCard';
import { useBookmarks } from '../context/BookmarkContext';

/**
 * Bookmarks component: displays a list of bookmarked projects
 */
const Bookmarks = () => {
  // Get the list of bookmarks from the BookmarkContext
  const { bookmarks } = useBookmarks();

  // State to store the search query
  const [search, setSearch] = React.useState('');

  // Filter the bookmarks based on the search query
  const filtered = bookmarks.filter(project =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      {/* Render the sidebar */}
      <Sidebar />
      <div className="dashboard-main">
        {/* Render the top bar with search functionality */}
        <TopBar search={search} setSearch={setSearch} onNewProject={() => {}} />
        <div className="dashboard-content">
          {/* Display the title */}
          <h2>Bookmarked Projects</h2>
          {/* Display the list of bookmarked projects */}
          <div className="project-grid">
            {/* If no bookmarks, display a message */}
            {filtered.length === 0
              ? <div style={{color: 'var(--text-secondary)', fontSize: '1.1rem'}}>No bookmarks yet.</div>
              : /* Otherwise, render the list of projects */
                filtered.map(project => <ProjectCard key={project.id} project={project} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;