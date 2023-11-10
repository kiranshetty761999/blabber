import './App.css';
import AuthLayout from './pages/AuthLayout/AuthLayout';
import ChatLayout from './pages/ChatLayout/ChatLayout';
import SnackBar from './components/SnackBar/SnackBar';
import { Provider } from "react-redux";
import store from './store/index';

function App() {

  return (
    <div >
      {/* <ChatLayout/> */}
      <Provider store={store}>
        <AuthLayout />
        <SnackBar />
      </Provider>
    </div>
  );
}

export default App;
