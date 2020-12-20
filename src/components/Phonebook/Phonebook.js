// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
// import { useLocalStorage } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Section from './Section';
import Form from './Form/Form';
import contactsData from './contactsData/contacts.json';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import s from './Form/Form.module.css';

export default function Phonebook() {
  const [filter, setFilter] = useState('');

  const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
      return JSON.parse(window.localStorage.getItem(key)) || initialValue;
    });

    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state));
      const localstorageArrayLength =
        JSON.parse(window.localStorage.getItem(key)).length === 0;
      if (localstorageArrayLength) {
        setState(initialValue);
      }
    }, [initialValue, key, state]);

    return [state, setState];
  };

  const [contacts, setContacts] = useLocalStorage('contacts', contactsData);

  const formSubmitHandler = data => {
    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase(),
      )
    ) {
      alert(`${data.name} is already in your phonebook, bro!`);
    } else if (contacts.find(({ number }) => number === data.number)) {
      alert(`${data.name} is already in your phonebook, bro!`);
    } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(data.number)) {
      alert(`Enter valid number please`);
    } else {
      data.id = uuidv4();
      setContacts(state => [data, ...state]);
    }
  };

  const deleteContacts = id => {
    setContacts(s => s.filter(contact => contact.id !== id));
  };

  const getFilter = e => {
    setFilter(e.currentTarget.value.toLowerCase());
  };

  const getFiltredContacts = () => {
    return contacts.filter(person =>
      person.name.toLowerCase().includes(filter),
    );
  };

  return (
    <div className={s.container}>
      <Section title="Phonebook">
        <Form onSubmit={formSubmitHandler} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={getFilter} />
        <ContactList
          contacts={getFiltredContacts()}
          onDeleteContacts={deleteContacts}
        />
      </Section>
    </div>
  );
}

// class Phonebook extends Component {
//   state = {
//     contacts: contactsData,
//     filter: '',
//   };

//   formSubmitHandler = data => {
//     if (
//       this.state.contacts.some(
//         ({ name }) => name.toLowerCase() === data.name.toLowerCase(),
//       )
//     ) {
//       alert(`${data.name} is already in your phonebook, bro!`);
//     } else if (
//       this.state.contacts.find(({ number }) => number === data.number)
//     ) {
//       alert(`${data.name} is already in your phonebook, bro!`);
//     } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(data.number)) {
//       alert(`Enter valid number please`);
//     } else {
//       data.id = uuidv4();
//       this.setState(({ contacts }) => ({
//         contacts: [data, ...contacts],
//       }));
//     }
//   };

//   deleteContacts = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   getFilter = e => {
//     this.setState({
//       filter: e.currentTarget.value.toLowerCase(),
//     });
//   };

//   getFiltredContacts() {
//     const { contacts, filter } = this.state;
//     return contacts.filter(person =>
//       person.name.toLowerCase().includes(filter),
//     );
//   }

//   render() {
//     const { filter } = this.state;

//     return (
//       <div className={s.container}>
//         <Section title="Phonebook">
//           <Form onSubmit={this.formSubmitHandler} />
//         </Section>
//         <Section title="Contacts">
//           <Filter value={filter} onChange={this.getFilter} />
//           <ContactList
//             contacts={this.getFiltredContacts()}
//             onDeleteContacts={this.deleteContacts}
//           />
//         </Section>
//       </div>
//     );
//   }
// }

// export default Phonebook;
