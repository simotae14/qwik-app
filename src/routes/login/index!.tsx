import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint, type RequestHandler } from "@builder.io/qwik-city";

interface Login {
  username: string;
  password: string;
  error: string;
}

export const onGet: RequestHandler<Login> = async () => {
  return {
    username: '',
    password: '',
    error: '',
  };
};

export const onPost: RequestHandler<Login> = async ({ request, response, cookie, url }) => {
  const formData = await request.formData();
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (username === "admin" && password === "admin") {
    cookie.set('contact-login', "true", {
      path: '/',
    });
    const redirectUrl = new URL(url).searchParams.get('redirect') || '/contacts/';
    throw response.redirect(redirectUrl);
  }

  return {
    username,
    password,
    error: 'Invalid username or password',
  };
};

export default component$(() => {
  const endpoint = useEndpoint<typeof onGet>();
  return (
    <Resource
      value={endpoint}
      onResolved={(login) => (
        <form method="POST">
          {login.error && <div>{login.error}</div>}
          <br />
          <label>username</label>
          <input type="text" name="username" value={login.username} placeholder="Username" />
          <br />
          <label>password</label>
          <input type="password" name="password" value={login.password} placeholder="Password" />
          <br />
          <button>Login</button>
        </form>
      )}
    />
  );
});