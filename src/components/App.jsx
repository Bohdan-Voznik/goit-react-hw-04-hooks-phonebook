import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const addContact = data => {
    const { name, number } = data;
    if (contacts.findIndex(contact => contact.name === name) !== -1) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevState => {
      return [
        ...prevState,
        {
          id: nanoid(),
          name,
          number,
        },
      ];
    });
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const filterChange = e => {
    const newFilter = e.currentTarget.value;
    setFilter(newFilter.toLowerCase());
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter tag={filter} onChange={filterChange} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
};
