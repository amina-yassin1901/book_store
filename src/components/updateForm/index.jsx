import { useForm } from "react-hook-form";
import styles from "./styles..module.css";

function UpdateForm({
  initialTitle,
  initialAuthor,
  initialYear,
  onSave,
  onCancel,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: initialTitle,
      author: initialAuthor,
      year: initialYear,
    },
  });
  const onSubmit = (data) => {
    onSave(data.title, data.author, data.year);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className={styles.input}
        {...register("title", { required: true })}
        placeholder="Title"
      />
      <input
        type="text"
        className={styles.input}
        {...register("author", { required: true })}
        placeholder="Author"
      />
      <input
        type="number"
        className={styles.input}
        {...register("year", { required: true })}
        placeholder="Year"
      />
      <div className={styles.actions}>
        <button type="submit" className={styles.button}>
          Save
        </button>
        <button
          type="button"
          className={styles.buttonDelete}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
export default UpdateForm;
