import { useState } from "react";
import "./App.css";

const notesData = [
  {
    id: 1,
    title: "JavaScript Basics Notes",
    subject: "JavaScript",
    type: "PDF",
    pages: 24,
    downloads: 120,
    description: "Beginner-friendly notes covering variables, functions, arrays, objects, and loops.",
    fileUrl: "#",
  },
  {
    id: 2,
    title: "React Components Notes",
    subject: "React",
    type: "PDF",
    pages: 18,
    downloads: 95,
    description: "Understand components, props, state, hooks, and reusable UI patterns.",
    fileUrl: "#",
  },
  {
    id: 3,
    title: "DBMS Short Notes",
    subject: "Database",
    type: "PDF",
    pages: 32,
    downloads: 80,
    description: "Quick notes on ER model, normalization, SQL queries, keys, and transactions.",
    fileUrl: "#",
  },
  {
    id: 4,
    title: "Operating System Notes",
    subject: "OS",
    type: "PDF",
    pages: 40,
    downloads: 150,
    description: "Covers process scheduling, deadlock, memory management, and file systems.",
    fileUrl: "#",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState(notesData);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    fileName: "",
  });

  const filteredNotes = notes.filter((note) => {
    const query = search.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.subject.toLowerCase().includes(query)
    );
  });

  const handleUpload = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.subject || !formData.description) {
      alert("Please fill all required fields");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: formData.title,
      subject: formData.subject,
      type: "PDF",
      pages: "New",
      downloads: 0,
      description: formData.description,
      fileUrl: "#",
    };

    setNotes([newNote, ...notes]);

    setFormData({
      title: "",
      subject: "",
      description: "",
      fileName: "",
    });

    alert("Note added successfully. Backend upload will be added later.");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          Note<span>Vault</span>
        </div>

        <ul className="nav-links">
          <li><a href="#subjects">Subjects</a></li>
          <li><a href="#popular">Popular Notes</a></li>
          <li><a href="#upload">Upload Notes</a></li>
          <li><a href="#footer">Contact</a></li>
        </ul>

        <div className="nav-actions">
          <button className="login-btn">Login</button>
          <button className="start-btn">Upload Notes</button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-text">
          <span className="hero-tag">Student Notes Platform</span>
          <h1>Find the notes you need, faster.</h1>
          <p>
            Download subject-wise notes, PDFs, assignments, and study material in one clean place.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search notes by subject or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Search Notes</button>
          </div>
        </div>

        <div className="note-showcase">
          <div className="note-stack">
            <div className="note-paper first">
              <h3>React Notes</h3>
              <p>Components • Hooks • Props</p>
            </div>
            <div className="note-paper second">
              <h3>DBMS Notes</h3>
              <p>SQL • Keys • Normalization</p>
            </div>
            <div className="note-paper third">
              <h3>DSA Notes</h3>
              <p>Arrays • Trees • Graphs</p>
            </div>
          </div>
          <div className="book-details">
            <h3>Featured Notes</h3>
            <p>Download and learn anytime</p>
          </div>
        </div>
      </header>

      <section className="subjects-section" id="subjects">
        <h2>Explore By Subject</h2>

        <div className="subject-grid">
          <div>JavaScript</div>
          <div>React</div>
          <div>DBMS</div>
          <div>Operating System</div>
          <div>DSA</div>
          <div>Computer Networks</div>
        </div>
      </section>

      <section className="best-sellers" id="popular">
        <h2>Popular Study Notes</h2>

        <div className="book-grid">
          {filteredNotes.map((note) => (
            <div className="book-item" key={note.id}>
              <div className="book-badge">{note.type}</div>
              <div className="note-icon">📄</div>
              <h3>{note.title}</h3>
              <p className="author">{note.subject}</p>
              <p className="note-desc">{note.description}</p>
              <p className="price">{note.downloads} downloads</p>
              <button className="download-btn">Download</button>
            </div>
          ))}
        </div>
      </section>

      <section className="upload-section" id="upload">
        <div className="upload-container">
          <div className="experience-text">
            <h2>Upload Your Notes</h2>
            <p>
              Add your study material and help other students learn better. For now this saves notes on frontend only. Later we will connect backend, MongoDB, and real PDF upload.
            </p>
          </div>

          <form className="upload-form" onSubmit={handleUpload}>
            <input
              type="text"
              placeholder="Note title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />

            <textarea
              placeholder="Short description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fileName: e.target.files[0]?.name || "",
                })
              }
            />

            {formData.fileName && <p className="file-name">Selected: {formData.fileName}</p>}

            <button type="submit">Add Note</button>
          </form>
        </div>
      </section>

      <section className="testimonials">
        <h2>Why Students Use NoteVault</h2>

        <div className="testimonial-slider">
          <div className="testimonial-card">
            <h3>Quick Access</h3>
            <div className="stars">★★★★★</div>
            <p>Find notes by subject, topic, or course without searching everywhere.</p>
          </div>

          <div className="testimonial-card">
            <h3>Easy Downloads</h3>
            <div className="stars">★★★★★</div>
            <p>Download PDFs and study material in a clean and simple interface.</p>
          </div>

          <div className="testimonial-card">
            <h3>Upload & Share</h3>
            <div className="stars">★★★★★</div>
            <p>Students can contribute their notes and help others learn faster.</p>
          </div>
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="footer-columns">
          <div className="footer-column">
            <h4>NoteVault</h4>
            <p>Your simple platform for uploading, finding, and downloading study notes.</p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#subjects">Subjects</a></li>
              <li><a href="#popular">Popular Notes</a></li>
              <li><a href="#upload">Upload Notes</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Future Features</h4>
            <ul>
              <li>Admin dashboard</li>
              <li>PDF preview</li>
              <li>MongoDB storage</li>
              <li>User login</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 NoteVault — Learn. Share. Grow.</p>
        </div>
      </footer>
    </>
  );
}

export default App;