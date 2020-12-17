import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Section from './Section';
import Form from './Form/Form';
import contactsData from '../contacts.json';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import s from './Form/Form.module.css';

export default function Phonebook() {
  const [contacts,] = useState(contactsData);
  const [filter,] = useState('');
}

class Phonebook extends Component {
  state = {
    contacts: contactsData,
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContact = this.state.contacts;
    const prevContact = prevState.contacts;

    if (nextContact !== prevContact) {
      localStorage.setItem('contacts', JSON.stringify(nextContact));
    }
  }

  formSubmitHandler = data => {
    if (
      this.state.contacts.some(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase(),
      )
    ) {
      alert(`${data.name} is already in your phonebook, bro!`);
    } else if (
      this.state.contacts.find(({ number }) => number === data.number)
    ) {
      alert(`${data.name} is already in your phonebook, bro!`);
    } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(data.number)) {
      alert(`Enter valid number please`);
    } else {
      data.id = uuidv4();
      this.setState(({ contacts }) => ({
        contacts: [data, ...contacts],
      }));
    }
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilter = e => {
    this.setState({
      filter: e.currentTarget.value.toLowerCase(),
    });
  };

  getFiltredContacts() {
    const { contacts, filter } = this.state;
    return contacts.filter(person =>
      person.name.toLowerCase().includes(filter),
    );
  }

  render() {
    const { filter } = this.state;

    return (
      <div className={s.container}>
        <Section title="Phonebook">
          <Form onSubmit={this.formSubmitHandler} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.getFilter} />
          <ContactList
            contacts={this.getFiltredContacts()}
            onDeleteContacts={this.deleteContacts}
          />
        </Section>
      </div>
    );
  }
}

export default Phonebook;
