import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { readerAdd } from "../../redux/actions";
import styles from "./styles.module.css";

function ReaderForm({ readerAdd }) {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    readerAdd(data.name, data.email);
    reset();
  };
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Register Reader</h2>
        <input
          type="text"
          placeholder="Reader name"
          {...register("name", { required: true })}
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        <button className={styles.button} type="submit">
          Add reader
        </button>
      </form>
    </div>
  );
}
const mapDispatchToProps = { readerAdd };
export default connect(null, mapDispatchToProps)(ReaderForm);
