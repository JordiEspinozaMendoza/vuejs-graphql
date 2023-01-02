<script>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const POSTS_QUERY = gql`
  query getAllPosts {
    getAllPosts {
      id
      title
      content
      author {
        id
        name
      }
    }
  }
`;

export default {
  name: "App",
  data() {
    const { result, loading, error } = useQuery(POSTS_QUERY);
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
    <h1>Posts</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error }}</div>
    <div v-if="result">
      <div v-for="post in result.getAllPosts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <p>Author: {{ post.author.name }}</p>
      </div>
    </div>
  </div>
</template>
