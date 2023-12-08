import './App.css';
import CategoryForm from './Components/CategoryForm';
import CategoryPreview from './Components/CategoryPreview';
import ComprehensionPreview from './Components/ComprehensionPreview';
import FormBuilder from './Components/FormBuilder';

function App() {
  return (
    <div className="App">
      {/* <CategoryForm type="categorize" number={2}/> */}
      <FormBuilder />
      {/* <CategoryPreview number={2}/> */}
    </div>
  );
}

export default App;
