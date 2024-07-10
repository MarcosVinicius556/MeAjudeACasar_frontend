import { BrowserRouter } from 'react-router-dom';
import RouteConfig from './routes/RouteConfig';
import Header from './components/Header';
import Footer from './components/Footer';


//Styles
import { BodyContent, MainSection } from './styles/Global';

function App() {

  return (
    <>
      <BodyContent>
          <BrowserRouter>
              <Header />
              <MainSection>
                    <RouteConfig />
              </MainSection>
              <Footer />
          </BrowserRouter>
      </BodyContent>
    </>
  )
}

export default App
