import { component$, Resource, useStylesScoped$ } from "@builder.io/qwik";
import { useEndpoint, type RequestHandler } from "@builder.io/qwik-city";
import { type Contact, CONTACTS } from "./fake-db";
import CSS from './index.css?inline';

export const onGet: RequestHandler<Contact[]> = async () => {
  // Pretend we are fetching data from a database.
  // you can also fake an async response
  // return await Promise.resolve(CONTACTS);
  return CONTACTS;
};

export default component$(() => {
  useStylesScoped$(CSS);
  const endpoint = useEndpoint<typeof onGet>();
  return (
    <div>
      <h1>Contacts</h1>
      <Resource
        value={endpoint}
        onPending={() => <div>Loading...</div>}
        onResolved={(contacts) => {
          return (
            <ul>
              {contacts.map((contact) => (
                <li>
                  <img src={contact.avatar} alt={contact.name} />
                  {contact.name}
                </li>
              ))}
            </ul>
          );
        }}
      />
    </div>
  );
});