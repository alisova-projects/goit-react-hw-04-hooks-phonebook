import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <label className={s.label}>
    <p className={s.contacts}>
      Find contacts by name
      <input
        className={s.input}
        type="text"
        onChange={onChange}
        value={value}
      />
    </p>
  </label>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
export default Filter;
