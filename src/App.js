import { useContext, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/Auth";
import SignUp from "./pages/Auth/SignUp";
import LoadingScreen from "./components/LoadingScreen";
const Game = lazy(() => import("./pages/Game"));
const NavBar = lazy(() => import("./components/NavBar"));

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
};

const DefaultRoutes = ({ location }) => {
  return (
    <div>
      <NavBar />
      <PrivateRoute path="/game" component={Game} />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route component={DefaultRoutes} />
          <Route path="*">
            <div>Could not find any matches</div>
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
