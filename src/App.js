import 'antd/dist/antd.css';
import './App.css';
import {Divider} from 'antd';
import Header from "./components/Header";
import Movies from "./components/Movies";


const App = () => {
    return (
        <div className="App">
            <Header/>
            <Divider style={{marginTop: "0px"}}/>
            <Movies/>
        </div>
    );
};

export default App;
