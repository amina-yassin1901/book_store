import { connect } from "react-redux";
import styles from "./styles.module.css";

function StatisticsPanel({ statistics }) {
  const {
    totalBooks,
    availableBooks,
    borrowedBooks,
    booksByDecade,
    activeReadersCount,
    mostPopularAuthor,
  } = statistics;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Library Statistics</h2>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div>Total Books</div>
          <div className={styles.statValue}>{totalBooks}</div>
        </div>

        <div className={styles.statCard}>
          <div>Available</div>
          <div className={styles.statValue}>{availableBooks}</div>
        </div>

        <div className={styles.statCard}>
          <div>Borrowed</div>
          <div className={styles.statValue}>{borrowedBooks}</div>
        </div>

        <div className={styles.statCard}>
          <div>Active Readers</div>
          <div className={styles.statValue}>{activeReadersCount}</div>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Most Popular Author</h3>

      {mostPopularAuthor.name ? (
        <p>
          {mostPopularAuthor.name} ({mostPopularAuthor.booksCount} books)
        </p>
      ) : (
        <p className={styles.empty}>No authors yet</p>
      )}

      <h3 className={styles.sectionTitle}>Books by Decade</h3>

      {Object.keys(booksByDecade).length === 0 ? (
        <p className={styles.empty}>No books yet</p>
      ) : (
        <ul className={styles.list}>
          {Object.entries(booksByDecade)
            .sort((a, b) => a[0] - b[0])
            .map(([decade, count]) => (
              <li key={decade} className={styles.listItem}>
                {decade}s: {count}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    statistics: state.statistics,
  };
};

export default connect(mapStateToProps)(StatisticsPanel);
