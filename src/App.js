import './App.css';
import EtherExample from './Components/EthersExample';
import EventTable from './Components/EventUI';
import ContractInteraction from './Components/ReadData';
import SendEthers from './Components/SendEthers';

function App() {
  return (
    <div className="App">
    <ContractInteraction/>
    <EventTable/>
    <SendEthers/>
      <EtherExample/>
    </div>
  );
}

export default App;
