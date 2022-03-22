import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
        filter: '',
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filterChange = e => {
    const filter = e.currentTarget.value;

    this.setState(prevState => {
      return {
        ...prevState,
        filter,
      };
    });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  lol = () => {
    console.log('data ');
  };

  addContact = data => {
    console.log('data ', data);
    const { name, number } = data;
    if (
      this.state.contacts.findIndex(contact => contact.name === name) !== -1
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name,
            number,
          },
        ],
      };
    });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.lol} />
        <h2>Contacts</h2>
        <Filter tag={this.state.filter} onChange={this.filterChange} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
