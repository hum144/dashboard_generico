import { BrowserRouter as Router } from 'react-router-dom'
import store from './store';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import AnimatedRoutes from 'hocs/routes/Routes';


function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>LazyCat | Dashboard</title>
        <meta name="description" content="Pagina principal de LazyCat Developers" />
        <meta name="keywords" content="" />
        <meta name="robots" content="all" />
        <meta name="author" content="LazyCat" />
        <meta name="publisher" content="LazyCat" />
        <link rel="canonical" href="/" />

        {/* Social Media Tags */}
        <meta property="og:title" content='LazyCat Developers' />
        <meta property="og:description" content='Agencia de software. Servicios de creacion de pagina web y desarrollo de aplicaciones.' />
        <meta property="og:url" content="" />
        <meta property="og:image" content='' />

        <meta name="twitter:title" content='LazyCat DevelopersLazyCat Developers' />
        <meta
          name="twitter:description"
          content='Agencia de software. Servicios de creacion de pagina web y desarrollo de aplicaciones.'
        />
        <meta name="twitter:image" content='' />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Provider store={store}>
        <Router>
          <AnimatedRoutes/>
        </Router>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
