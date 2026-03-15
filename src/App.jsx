import "./App.css";
import BookForm from "./components/bookForm";
import BookList from "./components/bookList";
import ReaderForm from "./components/readerForm";
import ReaderList from "./components/readerList";
import LendBook from "./components/lendBook";
import StatisticsPanel from "./components/statisticsPanel";

function App() {
  return (
    <div className="app">
      <h1>Library Manager</h1>
      <StatisticsPanel />
      <LendBook />

      <div className="layout">
        <div className="booksSection">
          <BookForm />
          <BookList />
        </div>

        <div className="readersSection">
          <ReaderForm />
          <ReaderList />
        </div>
      </div>
    </div>
  );
}

export default App;
