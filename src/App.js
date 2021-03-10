import { useContext, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/Auth";
import SignUp from "./pages/Auth/SignUp";
import LoadingScreen from "./components/LoadingScreen";
const Game = lazy(() => import("./pages/Game"));

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

const App = () => {
  return (
    <div>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <PrivateRoute path="/game" component={Game} />
          <Route path="*">
            <div>Could not find any matches</div>
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
