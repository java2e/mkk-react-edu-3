import logo from './logo.svg';
import './App.css';
import Layout from './components/layout/Layout';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import AllQuotues from './pages/AllQuotes';
import QuoteDetail from './pages/QuoteDetail';
import NewQuote from './pages/NewQuote';
import NotFound from './pages/NotFound';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotues />
          </Route>
          <Route path='/quotes/:quoteId'>
            <QuoteDetail />
          </Route>
          <Route path='/new-quote'>
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>

  );
}

export default App;
