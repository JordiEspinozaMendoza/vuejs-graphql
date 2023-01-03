<!-- eslint-disable vue/multi-word-component-names -->
<script>
import "./styles.sass";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref } from "vue";
import { logErrorMessages } from "@vue/apollo-util";

export default {
  setup() {
    // Form refs
    const email = ref("");
    const password = ref("");
    const error = ref({ isError: false, message: "" });
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
      loading: loginLoading,
    } = useMutation(LOGIN_QUERY, () => ({
      variables: {
        email: email.value,
        password: password.value,
      },
    }));
    // On login done
    onLoginDone((data) => {
      localStorage.setItem("userInfo", JSON.stringify(data.login));
      window.location.href = "/";
    });
    // On login error
    onLoginError((e) => {
      logErrorMessages(e);
      error.value = {
        isError: true,
        message: e.message,
      };
    });
    return {
      email,
      password,
      login,
      error,
      loginLoading,
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
          :disabled="loginLoading"
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Insert your password"
          v-model="password"
          :disabled="loginLoading"
        />
        <div v-if="error.isError && !loginLoading" class="error__message">
          <p>{{ error.message }}</p>
        </div>
        <button
          type="submit"
          class="primary__button"
          @click.prevent="login"
          :disabled="loginLoading"
        >
          {{ loginLoading ? "Loading..." : "Login" }}
        </button>
      </form>
    </div>
  </div>
</template>
<style></style>
