import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { bookAdd } from "../../redux/actions";

function BookForm({ bookAdd }) {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    bookAdd(data.title, data.author, Number(data.year));
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Add new book</h2>
        <input
          placeholder="Title"
          type="text"
          {...register("title", { required: true })}
        />

        <input
          placeholder="Author"
          type="text"
          {...register("author", { required: true })}
        />
        <input
          placeholder="Year"
          type="number"
          {...register("year", { required: true })}
        />
        <button type="submit">Add book</button>
      </form>
    </div>
  );
}

const mapDispatchToProps = { bookAdd };
export default connect(null, mapDispatchToProps)(BookForm);
