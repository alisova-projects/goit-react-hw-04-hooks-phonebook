import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import { FaRegTimesCircle } from 'react-icons/fa';

function ContactList({ contacts, onDeleteContacts }) {
  return (
    <>
      <ul className={s.list}>
        {contacts.map(({ id, name, number }) => (
          <li className={s.item} key={id}>
            <p className={s.contact}>
              {name} : {number}
            </p>
            <button
              className={s.btn}
              type="button"
              onClick={() => onDeleteContacts(id)}
            >
              <FaRegTimesCircle className={s.icon} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContacts: PropTypes.func.isRequired,
};

export default ContactList;
