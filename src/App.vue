<script>
import { useQuery } from "@vue/apollo-composable";
import { ALL_POSTS_QUERY } from "./queries/getAllPosts";
export default {
  name: "App",
  data() {
    const { result, loading, error } = useQuery(ALL_POSTS_QUERY);
    return {
      result,
      loading,
      error,
    };
  },
};
</script>

<template>
  <div id="app">
    <h1>All posts list</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error }}</div>
    <div v-if="result">
      <div v-for="post in result.getAllPosts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content || "No content" }}</p>
        <p>Author: {{ post.author.name }}</p>
      </div>
    </div>
  </div>
</template>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
