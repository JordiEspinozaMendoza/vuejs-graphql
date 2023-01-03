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
    const name = ref("");
    // Mutation to register
    const REGISTER_QUERY = gql`
      mutation register($email: String!, $password: String!, $name: String!) {
        register(input: { email: $email, password: $password, name: $name }) {
          name
          email
        }
      }
    `;
    // useMutation hook
    const {
      mutate: register,
      onDone: onRegisterDone,
      onError: onRegisterError,
    } = useMutation(REGISTER_QUERY, () => ({
      variables: {
        name: name.value,
        email: email.value,
        password: password.value,
      },
    }));
    // On register done
    onRegisterDone((data) => {
      console.log(data);
    });
    // On register error
    onRegisterError((error) => {
      console.log(error);
    });
    return {
      email,
      password,
      name,
      register,
    };
  },
  methods: {},
};
</script>
<template>
  <div id="register">
    <div class="register__form">
      <div class="register__title">
        <h3>Register</h3>
        <span
          >Already have an account?
          <router-link to="/login">Login</router-link></span
        >
      </div>
      <form>
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Insert your name"
          v-model="name"
        />
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
        <button type="submit" class="primary__button" @click.prevent="register">
          Register
        </button>
      </form>
    </div>
  </div>
</template>
