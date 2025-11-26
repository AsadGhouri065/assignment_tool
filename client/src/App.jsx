import React, { useState } from 'react';
import Login from './components/Login';
import AnnotationTool from './components/AnnotationTool';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <AnnotationTool user={user} />
      )}
    </div>
  );
}

export default App;
