import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

export const Menu = props => (
  <div>
    <Router>
      <nav>
        <ul className="menu-bar">
          {props.routes.map(route => (
            <li key={route.label} className="menu-item">
              <Link to={route.path} className="menu-item-link">
                {route.label}
              </Link>
            </li>  
          ))}
        </ul>

        <Switch>
          {props.routes.map(route => {
            const Page = route.page;

            return (
              <Route exact path={route.path} key={`Route:${route.label}`}>
                <Page />
              </Route>        
            );
          })}
        </Switch>
      </nav>
    </Router>
  </div>
);
