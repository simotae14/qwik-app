import { component$, Resource, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { useEndpoint, type RequestHandler } from "@builder.io/qwik-city";
import { CONTACTS } from "./fake-db";
import CSS from './index.css?inline';

interface SimpleContact {
  id: string;
  name: string;
  avatar?: string;
}

export const onGet: RequestHandler<SimpleContact[]> = async () => {
  // Pretend we are fetching data from a database.
  // you can also fake an async response
  // return await Promise.resolve(CONTACTS);
  return CONTACTS.map((contact) => ({ 
    id: contact.id,
    name: contact.name,
    avatar: contact.avatar
   }));
};

export default component$(() => {
  useStylesScoped$(CSS);
  const endpoint = useEndpoint<typeof onGet>();
  const filter = useSignal('');
  return (
    <div>
      <h1>Contacts</h1>
      <input placeholder="Search" onInput$={(event) => {
        filter.value = (event.target as HTMLInputElement).value;
      }} />
      <Resource
        value={endpoint}
        onPending={() => <div>Loading...</div>}
        onResolved={(contacts) => {
          return (
            <ul>
              {contacts.filter((cont) => cont.name.toLowerCase().indexOf(filter.value.toLowerCase()) > -1).map((contact) => (
                <li>
                  <a href={"/contacts/" + contact.id + "/"}>
                    <img src={contact.avatar} alt={contact.name} />
                    {contact.name}
                  </a>
                </li>
              ))}
            </ul>
          );
        }}
      />
    </div>
  );
});