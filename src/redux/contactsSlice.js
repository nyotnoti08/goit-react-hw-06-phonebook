import { createSlice, nanoid } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  // namespace
  name: 'contacts',
  initialState: {
    initialContacts: [
      { id: 'id-1', name: 'Edna Mode', number: '200-40-02' },
      { id: 'id-2', name: 'Wednesday Addams', number: '199-11-993' },
      { id: 'id-3', name: 'Wanda Maximoff', number: '645-17-79' },
      { id: 'id-4', name: 'Captain Jack Sparrow', number: '227-91-26' },
      { id: 'id-5', name: 'Steve Rogers', number: '201-14-01' },
      { id: 'id-6', name: 'Ace Ventura', number: '649-98-132' },
      { id: 'id-7', name: 'Bruce Lee', number: '998-82-123' },
    ],
  },
  reducers: {
    addContact: {
      reducer: (state, action) => {
        state.initialContacts.push(action.payload);
      },
      // preprocesses the payload before dispatching the action
      prepare: (name, number) => {
        return {
          payload: {
            id: nanoid(),
            name: name.trim(),
            number: number.trim(),
          },
        };
      },
    },

    deleteContact: (state, action) => {
      const index = state.initialContacts.findIndex(
        contact => contact.id === action.payload
      );
      state.initialContacts.splice(index, 1);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact, deleteAllContacts } =
  contactsSlice.actions;
