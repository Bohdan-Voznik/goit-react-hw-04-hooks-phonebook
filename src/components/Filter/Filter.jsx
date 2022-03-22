import PropTypes from 'prop-types';

export const Filter = ({ tag, onChange }) => {
  return (
    <label>
      Find contacts by name
      <br />
      <input
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Filter"
        required
        value={tag}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  tag: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
