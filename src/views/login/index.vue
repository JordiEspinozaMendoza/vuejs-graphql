<!-- eslint-disable vue/multi-word-component-names -->
<script>
import "./styles.sass";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref } from "vue";

export default {
  setup() {
    // Form refs
    const email = ref("");
    const password = ref("");
    // Mutation to login
    const LOGIN_QUERY = gql`
      mutation login($email: String!, $password: String!) {
        login(input: { email: $email, password: $password }) {
          token
          name
          email
        }
      }
    `;
    // useMutation hook
    const {
      mutate: login,
      onDone: onLoginDone,
      onError: onLoginError,
    } = useMutation(LOGIN_QUERY, () => ({
      variables: {
        email: email.value,
        password: password.value,
      },
    }));
    // On login done
    onLoginDone((data) => {
      console.log(data);
    });
    // On login error
    onLoginError((error) => {
      console.log(error);
    });
    return {
      email,
      password,
      login,
    };
  },
  methods: {},
};
</script>
<template>
  <div id="login">
    <div class="login__form">
      <div class="login__title">
        <h3>Login</h3>
        <span
          >Don't have an account yet?
          <router-link to="/register">Register</router-link></span
        >
      </div>
      <form>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Insert your email"
          v-model="email"
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Insert your password"
          v-model="password"
        />
        <button type="submit" class="primary__button" @click.prevent="login">
          Login
        </button>
      </form>
    </div>
  </div>
</template>
<style></style>
