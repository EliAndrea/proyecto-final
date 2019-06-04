import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './views/home.js';
import Workers from './views/workers.js';
import Day from './views/day.js';
import ThemeProvider from "./context/themeProvider.js";
import Email from "./views/cambioemail.js";
import LoginView from "./views/login.js";
import Profile from './views/profile.js';
import Menu from './views/menu.js';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="App">
                    <Switch>
                    <Route path="/" exact component={LoginView} />
                        <Route path="/home/" component={Home} />
                        <Route path="/workers/" component={Workers} />
                        <Route path="/day" component={Day} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/cambioemail" exact component={Email} />
                        <Route path="/menu" component={Menu} />
                    </Switch>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;