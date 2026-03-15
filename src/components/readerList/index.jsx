import { connect } from "react-redux";
import Reader from "../reader/index";
import styles from "./styles.module.css";
function ReaderList({ readers }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Readers</h2>

      {readers.length === 0 ? (
        <p>No registered readers yet</p>
      ) : (
        <ul className={styles.list}>
          {readers.map((reader) => (
            <Reader key={reader.id} reader={reader} />
          ))}
        </ul>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return { readers: state.readers };
};
export default connect(mapStateToProps)(ReaderList);
