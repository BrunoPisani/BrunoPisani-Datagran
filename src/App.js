import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Highcharts from  './pages/Graphs';
import Posts from './pages/Posts';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul style={{display:'flex', flexDirection:'row', justifyContent: 'space-around'}}>
            <li>
              <Link to="/graphs">Graphs</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/graphs">
            <Highcharts />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return null;
}
