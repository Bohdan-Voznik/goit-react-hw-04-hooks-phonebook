import PropTypes from 'prop-types';

export const Contact = ({ id, name, number, onDeleteContact }) => {
  return (
    <li key={id}>
      <span>
        {name}: {number}
      </span>
      <button
        type="button"
        onClick={() => {
          onDeleteContact(id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
