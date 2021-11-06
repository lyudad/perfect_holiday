import Container from './Components/Container';
import { QueryClient, QueryClientProvider } from 'react-query';
import Users from 'Components/Users';
const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        
      </Container>
    </QueryClientProvider>
  );
}

export default App;
